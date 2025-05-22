import Medusa from "@medusajs/medusa-js";

// Vytvoření instance Medusa klienta s výchozí konfigurací
let baseUrl = import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000";

// Ujistíme se, že baseUrl je absolutní URL
if (baseUrl === "/store" || !baseUrl.startsWith("http")) {
  console.warn(`[Medusa Client] WARNING: baseUrl "${baseUrl}" není absolutní URL. Používám výchozí hodnotu "http://localhost:9000".`);
  baseUrl = "http://localhost:9000";
}

// Vytvoření instance Medusa klienta s aktualizovanou konfigurací
// Ujistíme se, že baseUrl obsahuje /store
if (!baseUrl.endsWith('/store')) {
  baseUrl = `${baseUrl}/store`;
  console.log(`[Medusa Client] Upravená baseURL pro správnou komunikaci s Medusa backendem: ${baseUrl}`);
}

const medusaClient = new Medusa({
  baseUrl,
  maxRetries: 3,
  apiKey: import.meta.env.VITE_MEDUSA_API_KEY, // Volitelný API klíč pro autentizaci
  publishableApiKey: import.meta.env.VITE_MEDUSA_PUBLISHABLE_API_KEY || "test", // Volitelný publishable API klíč
  // Další možnosti konfigurace lze přidat zde
});

// Výpis aktuální konfigurace pro debugging
console.log(`[Medusa Client] Initialized with configuration:`);
console.log(`[Medusa Client] - baseURL: ${baseUrl}`);
console.log(`[Medusa Client] - maxRetries: 3`);
console.log(`[Medusa Client] - apiKey: ${import.meta.env.VITE_MEDUSA_API_KEY ? "Nastaveno" : "Nenastaveno"}`);
console.log(`[Medusa Client] - publishableApiKey: ${import.meta.env.VITE_MEDUSA_PUBLISHABLE_API_KEY ? "Nastaveno" : "Nenastaveno"}`);
// Medusa.js v6.x již nemá vlastnost VERSION
console.log(`[Medusa Client] - Medusa.js version: 6.x (aktualizovaná verze)`);
console.log(`[Medusa Client] - Environment variables:`, {
  VITE_MEDUSA_BACKEND_URL: import.meta.env.VITE_MEDUSA_BACKEND_URL,
  VITE_USE_MEDUSA: import.meta.env.VITE_USE_MEDUSA,
  VITE_DEBUG: import.meta.env.VITE_DEBUG,
});

// Pomocná funkce pro logování
const logMedusaCall = (message: string, ...data: any[]) => {
  console.log(`[Medusa] ${message}`, ...data);
};

// Pomocná funkce pro logování chyb
const logMedusaError = (message: string, error: any) => {
  console.error(`[Medusa ERROR] ${message}`, error);

  // Detailnější informace o chybě
  if (error.response) {
    // Server vrátil odpověď s chybovým stavovým kódem
    console.error(`[Medusa ERROR] Status: ${error.response.status}`);
    console.error(`[Medusa ERROR] Data:`, error.response.data);
    console.error(`[Medusa ERROR] Headers:`, error.response.headers);
  } else if (error.request) {
    // Požadavek byl odeslán, ale nedošla žádná odpověď
    console.error('[Medusa ERROR] No response received from server');
    console.error(error.request);
  } else {
    // Něco se pokazilo při nastavování požadavku
    console.error('[Medusa ERROR] Error setting up request:', error.message);
  }

  // Kontrola CORS problémů
  if (error.message && error.message.includes('CORS')) {
    console.error('[Medusa ERROR] Possible CORS issue detected. Check CORS configuration in Medusa backend.');
    console.error('[Medusa ERROR] Make sure your frontend URL is allowed in STORE_CORS in medusa-config.js or .env file.');
  }
};

// Produktové API funkce
export const medusaProductApi = {
  // Získání všech produktů
  getProducts: async (params = {}) => {
    try {
      logMedusaCall(`Fetching products with params:`, params);

      // V Medusa JS klientu verze 6.x se používá listProducts() místo list()
      const { products, limit, offset, count } = await medusaClient.products.listProducts(params);

      logMedusaCall(`Received ${products.length} products`);
      return { products, limit, offset, count };
    } catch (error) {
      logMedusaError('Failed to fetch products', error);
      throw error;
    }
  },

  // Získání jednoho produktu podle ID
  getProduct: async (id: string) => {
    try {
      // V Medusa JS klientu verze 6.x se používá retrieveProduct() místo retrieve()
      const { product } = await medusaClient.products.retrieveProduct(id);
      return product;
    } catch (error) {
      console.error(`[Medusa API Error] Failed to fetch product with ID ${id}:`, error);
      throw error;
    }
  },

  // Získání produktu podle handle (slug)
  getProductByHandle: async (handle: string) => {
    try {
      // V Medusa JS klientu verze 6.x se používá listProducts() místo list()
      const { products } = await medusaClient.products.listProducts({ handle });
      return products[0] || null;
    } catch (error) {
      console.error(`[Medusa API Error] Failed to fetch product with handle ${handle}:`, error);
      throw error;
    }
  },

  // Získání produktů podle kategorie
  getProductsByCategory: async (categoryId: string) => {
    try {
      // V Medusa JS klientu verze 6.x se používá listProducts() místo list()
      const { products } = await medusaClient.products.listProducts({ category_id: [categoryId] });
      return products;
    } catch (error) {
      console.error(`[Medusa API Error] Failed to fetch products for category ${categoryId}:`, error);
      throw error;
    }
  },
};

// API funkce pro košík
export const medusaCartApi = {
  // Vytvoření nového košíku
  createCart: async () => {
    try {
      // V Medusa JS klientu verze 6.x se používá createCart() místo create()
      const { cart } = await medusaClient.carts.createCart();
      return cart;
    } catch (error) {
      console.error('[Medusa API Error] Failed to create cart:', error);
      throw error;
    }
  },

  // Získání košíku podle ID
  getCart: async (cartId: string) => {
    try {
      // V Medusa JS klientu verze 6.x se používá retrieveCart() místo retrieve()
      const { cart } = await medusaClient.carts.retrieveCart(cartId);
      return cart;
    } catch (error) {
      console.error(`[Medusa API Error] Failed to fetch cart with ID ${cartId}:`, error);
      throw error;
    }
  },

  // Přidání položky do košíku
  addItem: async (cartId: string, variantId: string, quantity: number) => {
    try {
      // V Medusa JS klientu verze 6.x se používá createLineItem() místo create()
      const { cart } = await medusaClient.carts.lineItems.createLineItem(cartId, {
        variant_id: variantId,
        quantity
      });
      return cart;
    } catch (error) {
      console.error(`[Medusa API Error] Failed to add item to cart ${cartId}:`, error);
      throw error;
    }
  },

  // Aktualizace položky v košíku
  updateItem: async (cartId: string, lineId: string, quantity: number) => {
    try {
      // V Medusa JS klientu verze 6.x se používá updateLineItem() místo update()
      const { cart } = await medusaClient.carts.lineItems.updateLineItem(cartId, lineId, {
        quantity
      });
      return cart;
    } catch (error) {
      console.error(`[Medusa API Error] Failed to update item in cart ${cartId}:`, error);
      throw error;
    }
  },

  // Odstranění položky z košíku
  removeItem: async (cartId: string, lineId: string) => {
    try {
      // V Medusa JS klientu verze 6.x se používá deleteLineItem() místo delete()
      const { cart } = await medusaClient.carts.lineItems.deleteLineItem(cartId, lineId);
      return cart;
    } catch (error) {
      console.error(`[Medusa API Error] Failed to remove item from cart ${cartId}:`, error);
      throw error;
    }
  },
};

// API funkce pro kategorie
export const medusaCategoryApi = {
  // Získání všech kategorií
  getCategories: async () => {
    try {
      // V Medusa JS klientu verze 6.x se používá listCategories() místo list()
      const { product_categories } = await medusaClient.productCategories.listCategories();
      return product_categories;
    } catch (error) {
      console.error('[Medusa API Error] Failed to fetch categories:', error);
      throw error;
    }
  },

  // Získání kategorie podle ID
  getCategory: async (id: string) => {
    try {
      // V Medusa JS klientu verze 6.x se používá retrieveCategory() místo retrieve()
      const { product_category } = await medusaClient.productCategories.retrieveCategory(id);
      return product_category;
    } catch (error) {
      console.error(`[Medusa API Error] Failed to fetch category with ID ${id}:`, error);
      throw error;
    }
  },
};

// Export všech API funkcí
export default {
  products: medusaProductApi,
  cart: medusaCartApi,
  categories: medusaCategoryApi,
  client: medusaClient, // Export samotného klienta pro případné další použití
};
