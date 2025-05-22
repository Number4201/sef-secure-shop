import { Product as MedusaProduct } from "@medusajs/medusa";
import { Product } from "@/types/product";
import medusaClient from "./medusa-client";

// Pomocná funkce pro logování
const logMedusaCall = (message: string, ...data: any[]) => {
  console.log(`[Medusa] ${message}`, ...data);
};

// Pomocná funkce pro logování chyb
const logMedusaError = (message: string, error: any) => {
  console.error(`[Medusa ERROR] ${message}`, error);
};

// Funkce pro převod Medusa produktu na náš formát produktu
const convertMedusaProduct = (medusaProduct: MedusaProduct): Product => {
  try {
    // Získání první varianty pro cenu
    const variant = medusaProduct.variants?.[0];
    const price = variant?.prices?.[0]?.amount || 0;
    const originalPrice = variant?.original_price || price;

    // Získání první kategorie
    const category = medusaProduct.categories?.[0]?.handle || "uncategorized";

    // Získání obrázku
    const image = medusaProduct.thumbnail ||
      medusaProduct.images?.[0]?.url ||
      "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=800";

    // Získání bezpečnostní třídy z metadat
    const safeClass = medusaProduct.metadata?.safeClass as string || "S1";

    // Získání dostupnosti
    const inStock = variant?.inventory_quantity ? variant.inventory_quantity > 0 : true;

    // Získání rozměrů z metadat
    const dimensions = medusaProduct.metadata?.dimensions as {
      width: number;
      height: number;
      depth: number
    } || { width: 30, height: 20, depth: 20 };

    // Získání hmotnosti
    const weight = variant?.weight || 10;

    // Získání vlastností z metadat
    const features = medusaProduct.metadata?.features as string[] || [];

    return {
      id: medusaProduct.id,
      name: medusaProduct.title,
      slug: medusaProduct.handle,
      price: price / 100, // Medusa ukládá ceny v nejmenších jednotkách měny (centy)
      originalPrice: originalPrice !== price ? originalPrice / 100 : undefined,
      image,
      category,
      safeClass,
      inStock,
      description: medusaProduct.description || "",
      features,
      dimensions,
      weight,
      // Další vlastnosti můžeme přidat podle potřeby
    };
  } catch (error) {
    logMedusaError(`Error converting Medusa product to our format:`, error);
    // Vrátíme základní produkt v případě chyby
    return {
      id: medusaProduct.id,
      name: medusaProduct.title || "Neznámý produkt",
      slug: medusaProduct.handle || medusaProduct.id,
      price: 0,
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=800",
      category: "uncategorized",
      inStock: false,
      description: "Chyba při načítání detailů produktu.",
    };
  }
};

// Funkce pro získání všech produktů z Medusa
export const fetchMedusaProducts = async (): Promise<Product[]> => {
  try {
    logMedusaCall("Fetching all products from Medusa");

    // Přidáme timeout pro detekci problémů s připojením
    const timeoutPromise = new Promise<{ products: any[] }>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout při načítání produktů z Medusa backendu")), 10000)
    );

    // Použijeme Promise.race pro implementaci timeoutu
    const { products } = await Promise.race([
      medusaClient.products.listProducts({ expand: "variants,categories,images" }),
      timeoutPromise
    ]);

    if (!products || !Array.isArray(products)) {
      logMedusaError("Received invalid products data from Medusa:", products);
      return [];
    }

    logMedusaCall(`Received ${products.length} products from Medusa`);

    // Převod Medusa produktů na náš formát
    return products.map(convertMedusaProduct);
  } catch (error) {
    logMedusaError("Error fetching products from Medusa:", error);

    // Přidáme více informací o chybě
    if (error.message && error.message.includes("Timeout")) {
      console.error("[Medusa ERROR] Timeout při komunikaci s backendem. Zkontrolujte, zda Medusa backend běží na adrese uvedené v baseUrl.");
    }

    return [];
  }
};

// Funkce pro získání produktů podle kategorie
export const fetchMedusaProductsByCategory = async (categoryHandle: string): Promise<Product[]> => {
  try {
    logMedusaCall(`Fetching products for category: ${categoryHandle}`);

    // Nejprve musíme najít ID kategorie podle handle
    const { product_categories } = await medusaClient.productCategories.listCategories({ handle: categoryHandle });

    if (!product_categories.length) {
      logMedusaCall(`Category with handle ${categoryHandle} not found`);
      return [];
    }

    const categoryId = product_categories[0].id;
    logMedusaCall(`Found category ID: ${categoryId}`);

    // Nyní můžeme získat produkty podle ID kategorie
    const { products } = await medusaClient.products.listProducts({
      category_id: [categoryId],
      expand: "variants,categories,images"
    });

    logMedusaCall(`Received ${products.length} products for category ${categoryHandle}`);

    // Převod Medusa produktů na náš formát
    return products.map(convertMedusaProduct);
  } catch (error) {
    logMedusaError(`Error fetching products for category ${categoryHandle}:`, error);
    return [];
  }
};

// Funkce pro získání produktu podle slug
export const fetchMedusaProductByHandle = async (handle: string): Promise<Product | null> => {
  try {
    logMedusaCall(`Fetching product with handle: ${handle}`);

    const { products } = await medusaClient.products.listProducts({
      handle,
      expand: "variants,categories,images"
    });

    if (!products.length) {
      logMedusaCall(`Product with handle ${handle} not found`);
      return null;
    }

    logMedusaCall(`Found product with handle ${handle}`);

    // Převod Medusa produktu na náš formát
    return convertMedusaProduct(products[0]);
  } catch (error) {
    logMedusaError(`Error fetching product with handle ${handle}:`, error);
    return null;
  }
};

// Funkce pro získání doporučených produktů
export const fetchMedusaFeaturedProducts = async (count: number = 4): Promise<Product[]> => {
  try {
    logMedusaCall(`Fetching ${count} featured products`);

    // Získáme produkty s tagem "featured"
    const { products } = await medusaClient.products.listProducts({
      tags: ["featured"],
      limit: count,
      expand: "variants,categories,images"
    });

    logMedusaCall(`Received ${products.length} featured products`);

    // Pokud nemáme dostatek produktů s tagem "featured", doplníme je běžnými produkty
    if (products.length < count) {
      logMedusaCall(`Not enough featured products, fetching regular products to fill`);

      const { products: regularProducts } = await medusaClient.products.listProducts({
        limit: count - products.length,
        expand: "variants,categories,images"
      });

      products.push(...regularProducts);
      logMedusaCall(`Added ${regularProducts.length} regular products to featured`);
    }

    // Převod Medusa produktů na náš formát
    return products.map(convertMedusaProduct);
  } catch (error) {
    logMedusaError(`Error fetching featured products:`, error);
    return [];
  }
};

// Funkce pro práci s košíkem
export const cartService = {
  // Vytvoření nového košíku
  createCart: async () => {
    try {
      logMedusaCall("Creating new cart");
      const { cart } = await medusaClient.carts.createCart();
      logMedusaCall(`Created new cart with ID: ${cart.id}`);
      return cart;
    } catch (error) {
      logMedusaError("Error creating cart:", error);
      throw error;
    }
  },

  // Získání košíku podle ID
  getCart: async (cartId: string) => {
    try {
      logMedusaCall(`Fetching cart with ID: ${cartId}`);
      const { cart } = await medusaClient.carts.retrieveCart(cartId);
      return cart;
    } catch (error) {
      logMedusaError(`Error fetching cart with ID ${cartId}:`, error);
      throw error;
    }
  },

  // Přidání položky do košíku
  addItem: async (cartId: string, variantId: string, quantity: number = 1) => {
    try {
      logMedusaCall(`Adding item to cart ${cartId}: variant ${variantId}, quantity ${quantity}`);
      const { cart } = await medusaClient.carts.lineItems.createLineItem(cartId, {
        variant_id: variantId,
        quantity
      });
      logMedusaCall(`Item added to cart, new cart:`, cart);
      return cart;
    } catch (error) {
      logMedusaError(`Error adding item to cart ${cartId}:`, error);
      throw error;
    }
  },

  // Aktualizace položky v košíku
  updateItem: async (cartId: string, lineId: string, quantity: number) => {
    try {
      logMedusaCall(`Updating item ${lineId} in cart ${cartId} to quantity ${quantity}`);
      const { cart } = await medusaClient.carts.lineItems.updateLineItem(cartId, lineId, {
        quantity
      });
      return cart;
    } catch (error) {
      logMedusaError(`Error updating item in cart ${cartId}:`, error);
      throw error;
    }
  },

  // Odstranění položky z košíku
  removeItem: async (cartId: string, lineId: string) => {
    try {
      logMedusaCall(`Removing item ${lineId} from cart ${cartId}`);
      const { cart } = await medusaClient.carts.lineItems.deleteLineItem(cartId, lineId);
      return cart;
    } catch (error) {
      logMedusaError(`Error removing item from cart ${cartId}:`, error);
      throw error;
    }
  },

  // Přidání adresy k košíku
  addShippingAddress: async (cartId: string, address: any) => {
    try {
      logMedusaCall(`Adding shipping address to cart ${cartId}`);
      const { cart } = await medusaClient.carts.update(cartId, {
        shipping_address: address
      });
      return cart;
    } catch (error) {
      logMedusaError(`Error adding shipping address to cart ${cartId}:`, error);
      throw error;
    }
  },

  // Přidání platební metody k košíku
  addPaymentMethod: async (cartId: string, providerId: string) => {
    try {
      logMedusaCall(`Adding payment method to cart ${cartId}`);
      const { cart } = await medusaClient.carts.update(cartId, {
        payment_provider_id: providerId
      });
      return cart;
    } catch (error) {
      logMedusaError(`Error adding payment method to cart ${cartId}:`, error);
      throw error;
    }
  },

  // Dokončení objednávky
  completeCart: async (cartId: string) => {
    try {
      logMedusaCall(`Completing cart ${cartId}`);
      const { order } = await medusaClient.carts.complete(cartId);
      logMedusaCall(`Cart completed, order created:`, order);
      return order;
    } catch (error) {
      logMedusaError(`Error completing cart ${cartId}:`, error);
      throw error;
    }
  }
};

// Funkce pro práci s objednávkami
export const orderService = {
  // Získání objednávky podle ID
  getOrder: async (orderId: string) => {
    try {
      logMedusaCall(`Fetching order with ID: ${orderId}`);
      const { order } = await medusaClient.orders.retrieve(orderId);
      return order;
    } catch (error) {
      logMedusaError(`Error fetching order with ID ${orderId}:`, error);
      throw error;
    }
  },

  // Získání objednávek zákazníka
  getCustomerOrders: async () => {
    try {
      logMedusaCall(`Fetching customer orders`);
      const { orders } = await medusaClient.customers.listOrders();
      return orders;
    } catch (error) {
      logMedusaError(`Error fetching customer orders:`, error);
      throw error;
    }
  }
};

// Funkce pro práci s uživateli
export const customerService = {
  // Registrace nového zákazníka
  register: async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      logMedusaCall(`Registering new customer with email: ${email}`);
      const { customer } = await medusaClient.customers.create({
        email,
        password,
        first_name: firstName,
        last_name: lastName
      });
      return customer;
    } catch (error) {
      logMedusaError(`Error registering customer:`, error);
      throw error;
    }
  },

  // Přihlášení zákazníka
  login: async (email: string, password: string) => {
    try {
      logMedusaCall(`Logging in customer with email: ${email}`);
      const { customer } = await medusaClient.auth.authenticate({
        email,
        password
      });
      return customer;
    } catch (error) {
      logMedusaError(`Error logging in customer:`, error);
      throw error;
    }
  },

  // Odhlášení zákazníka
  logout: async () => {
    try {
      logMedusaCall(`Logging out customer`);
      await medusaClient.auth.deleteSession();
      return true;
    } catch (error) {
      logMedusaError(`Error logging out customer:`, error);
      throw error;
    }
  },

  // Získání aktuálního zákazníka
  getCurrentCustomer: async () => {
    try {
      logMedusaCall(`Fetching current customer`);
      const { customer } = await medusaClient.customers.retrieve();
      return customer;
    } catch (error) {
      logMedusaError(`Error fetching current customer:`, error);
      return null;
    }
  }
};

// Export všech funkcí
export default {
  fetchProducts: fetchMedusaProducts,
  fetchProductsByCategory: fetchMedusaProductsByCategory,
  fetchProductByHandle: fetchMedusaProductByHandle,
  fetchFeaturedProducts: fetchMedusaFeaturedProducts,
  cart: cartService,
  order: orderService,
  customer: customerService
};
