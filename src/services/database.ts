import { Product } from '@/types/product';
import { products as mockProducts } from '@/data/products';
import api, { safeCertificationApi, safeDimensionsApi, safeInteriorApi } from './api';
import medusaService from './medusa-service';

// Flag pro přepínání mezi mock daty a Medusa backendem
const USE_MEDUSA = import.meta.env.VITE_USE_MEDUSA === 'true'; // Použití hodnoty z .env souboru

// Výpis konfigurace pro debugging
console.log(`[Database] Configuration:`, {
  USE_MEDUSA,
  VITE_USE_MEDUSA: import.meta.env.VITE_USE_MEDUSA,
  VITE_MEDUSA_BACKEND_URL: import.meta.env.VITE_MEDUSA_BACKEND_URL,
});

// Pomocná funkce pro logování
const logApiCall = (message: string, ...data: any[]) => {
  console.log(`[API] ${message}`, ...data);
};

// Pomocná funkce pro logování chyb
const logApiError = (message: string, error: any) => {
  console.error(`[API ERROR] ${message}`, error);

  // Detailnější informace o chybě
  if (error.response) {
    // Server vrátil odpověď s chybovým stavovým kódem
    console.error(`Status: ${error.response.status}`);
    console.error(`Data: `, error.response.data);
    console.error(`Headers: `, error.response.headers);
  } else if (error.request) {
    // Požadavek byl odeslán, ale nedošla žádná odpověď
    console.error('Žádná odpověď od serveru');
    console.error(error.request);
  } else {
    // Něco se pokazilo při nastavování požadavku
    console.error('Chyba při nastavování požadavku:', error.message);
  }
};

// Function to fetch all products from the database
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // Pokud je aktivní Medusa backend, použijeme ho
    if (USE_MEDUSA) {
      console.log('[Database] Using Medusa backend for fetching products');
      return await medusaService.fetchProducts();
    }

    console.log('[Database] Using mock data for fetching products');
    // In a real application, this would be a Supabase query
    // const { data, error } = await supabase
    //   .from('products')
    //   .select('*');

    // if (error) throw error;
    // return data as Product[];

    // For now, we'll simulate a database call by adding enhanced product details
    return mockProducts.map(product => {
      // Convert dimensions from cm to mm for internal dimensions (simulating slightly smaller internal space)
      const externalWidth = product.dimensions?.width || 0;
      const externalHeight = product.dimensions?.height || 0;
      const externalDepth = product.dimensions?.depth || 0;

      // Calculate internal dimensions (typically 10-20% smaller than external)
      const wallThickness = 20; // 20mm wall thickness

      return {
        ...product,
        // Add certification details
        certificationStandard: 'ČSN EN 1143-1',
        securityClassification: product.safeClass ? `Třída ${product.safeClass}` : undefined,

        // Add internal dimensions in mm
        internalDimensions: {
          width: Math.max(0, externalWidth * 10 - wallThickness * 2),  // Convert cm to mm and subtract walls
          height: Math.max(0, externalHeight * 10 - wallThickness * 2),
          depth: Math.max(0, externalDepth * 10 - wallThickness * 2)
        },

        // Add interior features
        hooks: Math.floor(Math.random() * 10) + 1, // Random number of hooks between 1 and 10
        shelves: Math.floor(Math.random() * 3) + 1, // Random number of shelves between 1 and 3
        interiorFeatures: [
          'Vnitřní osvětlení LED',
          'Kotvící otvory',
          'Protipožární izolace',
          'Nastavitelné police'
        ].slice(0, Math.floor(Math.random() * 4) + 1) // Random selection of features
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Function to fetch a single product by slug
export const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    logApiCall(`Fetching product with slug: ${slug}`);

    // Pokud je aktivní Medusa backend, použijeme ho
    if (USE_MEDUSA) {
      console.log(`[Database] Using Medusa backend for fetching product with slug: ${slug}`);
      return await medusaService.fetchProductByHandle(slug);
    }

    console.log(`[Database] Using mock data for fetching product with slug: ${slug}`);
    // Fetch basic product data
    const product = mockProducts.find(p => p.slug === slug);
    if (!product) {
      logApiCall(`Product with slug ${slug} not found in mockProducts`);
      return null;
    }

    logApiCall(`Found product in mockProducts:`, product);

    // Fetch additional data from our API
    try {
      logApiCall(`Fetching additional data for product ID: ${product.id}`);

      // Map product ID to the format expected by the API
      // We need to handle different ID formats
      // If the product ID is already a number (like "1", "2"), use it directly
      // If it's a string like "nt-105", we need to map it to the corresponding numeric ID
      let apiProductId = product.id;

      // Check if we need to map the ID
      if (product.id.includes('-')) {
        // This is a mapping from product IDs like "nt-105" to numeric IDs like "1"
        const idMapping: Record<string, string> = {
          'nt-105': '1',
          'tz-250': '2',
          'ot-120': '3',
          'tz-5': '4',
          'tp-100': '5',
          'vt-cash': '6',
          'th-2m': '7',
          'nt-100': '8'
        };

        // Use the mapping if available, otherwise fall back to the original ID
        apiProductId = idMapping[product.id] || product.id;

        // Přidáno logování pro debugging
        console.log(`[DEBUG] Mapování ID produktu: ${product.id} -> ${apiProductId}`);
      } else {
        console.log(`[DEBUG] Použití původního ID produktu: ${product.id}`);
      }

      logApiCall(`Mapped product ID for API: ${apiProductId} (original: ${product.id})`);

      // Fetch certification data
      logApiCall(`Fetching certification data for product ID: ${apiProductId}`);
      const certification = await safeCertificationApi.getByProductId(apiProductId);
      logApiCall(`Certification data:`, certification);

      // Fetch dimensions data - external
      logApiCall(`Fetching external dimensions for product ID: ${apiProductId}`);
      const externalDimensions = await safeDimensionsApi.getByProductId(apiProductId, false);
      logApiCall(`External dimensions:`, externalDimensions);

      // Fetch dimensions data - internal
      logApiCall(`Fetching internal dimensions for product ID: ${apiProductId}`);
      const internalDimensions = await safeDimensionsApi.getByProductId(apiProductId, true);
      logApiCall(`Internal dimensions:`, internalDimensions);

      // Fetch interior features
      logApiCall(`Fetching interior features for product ID: ${apiProductId}`);
      const interior = await safeInteriorApi.getByProductId(apiProductId);
      logApiCall(`Interior features:`, interior);

      // Kontrola, zda se podařilo načíst všechna data
      if (!certification && !externalDimensions && !internalDimensions && !interior) {
        logApiError("Nepodařilo se načíst žádná data z API", {
          productId: apiProductId,
          message: "Všechny API požadavky selhaly nebo vrátily null"
        });
      }

      // Combine all data
      return {
        ...product,
        // Add certification details from API
        certificationStandard: certification?.standard || 'ČSN EN 1143-1',
        certificationLevel: certification?.level || product.safeClass,
        securityClassification: certification?.classification || (product.safeClass ? `Třída ${product.safeClass}` : undefined),
        recommendedInsurance: certification?.recommended_insurance || undefined,

        // Add dimensions from API
        dimensions: externalDimensions ? {
          width: externalDimensions.width / 10, // Convert mm to cm for display
          height: externalDimensions.height / 10,
          depth: externalDimensions.depth / 10
        } : product.dimensions,

        // Add internal dimensions from API
        internalDimensions: internalDimensions ? {
          width: internalDimensions.width,
          height: internalDimensions.height,
          depth: internalDimensions.depth
        } : (product.dimensions ? {
          // Fallback calculation if API fails
          width: product.dimensions.width * 10 - 40, // Convert cm to mm and subtract walls
          height: product.dimensions.height * 10 - 40,
          depth: product.dimensions.depth * 10 - 40
        } : undefined),

        // Add interior features from API
        hooks: interior?.hooks || Math.floor(Math.random() * 10) + 1,
        shelves: interior?.shelves || Math.floor(Math.random() * 3) + 1,
        interiorFeatures: interior?.features || [
          'Vnitřní osvětlení LED',
          'Kotvící otvory',
          'Protipožární izolace',
          'Nastavitelné police'
        ].slice(0, Math.floor(Math.random() * 4) + 1)
      };
    } catch (apiError) {
      logApiError(`Error fetching additional product data from API:`, apiError);

      // Fallback to basic product with calculated values
      const externalWidth = product.dimensions?.width || 0;
      const externalHeight = product.dimensions?.height || 0;
      const externalDepth = product.dimensions?.depth || 0;
      const wallThickness = 20; // 20mm wall thickness

      return {
        ...product,
        certificationStandard: 'ČSN EN 1143-1',
        securityClassification: product.safeClass ? `Třída ${product.safeClass}` : undefined,
        internalDimensions: {
          width: Math.max(0, externalWidth * 10 - wallThickness * 2),
          height: Math.max(0, externalHeight * 10 - wallThickness * 2),
          depth: Math.max(0, externalDepth * 10 - wallThickness * 2)
        },
        hooks: Math.floor(Math.random() * 10) + 1,
        shelves: Math.floor(Math.random() * 3) + 1,
        interiorFeatures: [
          'Vnitřní osvětlení LED',
          'Kotvící otvory',
          'Protipožární izolace',
          'Nastavitelné police'
        ].slice(0, Math.floor(Math.random() * 4) + 1)
      };
    }
  } catch (error) {
    logApiError(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
};

// Function to fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    // Pokud je aktivní Medusa backend, použijeme ho
    if (USE_MEDUSA) {
      console.log(`[Database] Using Medusa backend for fetching products in category: ${category}`);
      return await medusaService.fetchProductsByCategory(category);
    }

    console.log(`[Database] Using mock data for fetching products in category: ${category}`);
    // Get basic product data
    const filteredProducts = mockProducts.filter(p => p.category === category);

    // For each product, fetch additional data from API
    const enhancedProducts = await Promise.all(
      filteredProducts.map(async (product) => {
        try {
          console.log(`Fetching additional data for product ID: ${product.id}`);

          // Map product ID to the format expected by the API
          let apiProductId = product.id;

          // Check if we need to map the ID
          if (product.id.includes('-')) {
            // This is a mapping from product IDs like "nt-105" to numeric IDs like "1"
            const idMapping: Record<string, string> = {
              'nt-105': '1',
              'tz-250': '2',
              'ot-120': '3',
              'tz-5': '4',
              'tp-100': '5',
              'vt-cash': '6',
              'th-2m': '7',
              'nt-100': '8'
            };

            // Use the mapping if available, otherwise fall back to the original ID
            apiProductId = idMapping[product.id] || product.id;
          }

          console.log(`Mapped product ID for API: ${apiProductId} (original: ${product.id})`);

          // Fetch certification data
          const certification = await safeCertificationApi.getByProductId(apiProductId);

          // Fetch dimensions data - external
          const externalDimensions = await safeDimensionsApi.getByProductId(apiProductId, false);

          // Fetch dimensions data - internal
          const internalDimensions = await safeDimensionsApi.getByProductId(apiProductId, true);

          // Fetch interior features
          const interior = await safeInteriorApi.getByProductId(apiProductId);

          return {
            ...product,
            // Add certification details from API
            certificationStandard: certification?.standard || 'ČSN EN 1143-1',
            certificationLevel: certification?.level || product.safeClass,
            securityClassification: certification?.classification || (product.safeClass ? `Třída ${product.safeClass}` : undefined),
            recommendedInsurance: certification?.recommended_insurance || undefined,

            // Add dimensions from API
            dimensions: externalDimensions ? {
              width: externalDimensions.width / 10, // Convert mm to cm for display
              height: externalDimensions.height / 10,
              depth: externalDimensions.depth / 10
            } : product.dimensions,

            // Add internal dimensions from API
            internalDimensions: internalDimensions ? {
              width: internalDimensions.width,
              height: internalDimensions.height,
              depth: internalDimensions.depth
            } : (product.dimensions ? {
              // Fallback calculation if API fails
              width: product.dimensions.width * 10 - 40, // Convert cm to mm and subtract walls
              height: product.dimensions.height * 10 - 40,
              depth: product.dimensions.depth * 10 - 40
            } : undefined),

            // Add interior features from API
            hooks: interior?.hooks || Math.floor(Math.random() * 10) + 1,
            shelves: interior?.shelves || Math.floor(Math.random() * 3) + 1,
            interiorFeatures: interior?.features || [
              'Vnitřní osvětlení LED',
              'Kotvící otvory',
              'Protipožární izolace',
              'Nastavitelné police'
            ].slice(0, Math.floor(Math.random() * 4) + 1)
          };
        } catch (apiError) {
          console.error(`Error fetching additional data for product ${product.id}:`, apiError);

          // Fallback to basic product with calculated values
          const externalWidth = product.dimensions?.width || 0;
          const externalHeight = product.dimensions?.height || 0;
          const externalDepth = product.dimensions?.depth || 0;
          const wallThickness = 20; // 20mm wall thickness

          return {
            ...product,
            certificationStandard: 'ČSN EN 1143-1',
            securityClassification: product.safeClass ? `Třída ${product.safeClass}` : undefined,
            internalDimensions: {
              width: Math.max(0, externalWidth * 10 - wallThickness * 2),
              height: Math.max(0, externalHeight * 10 - wallThickness * 2),
              depth: Math.max(0, externalDepth * 10 - wallThickness * 2)
            },
            hooks: Math.floor(Math.random() * 10) + 1,
            shelves: Math.floor(Math.random() * 3) + 1,
            interiorFeatures: [
              'Vnitřní osvětlení LED',
              'Kotvící otvory',
              'Protipožární izolace',
              'Nastavitelné police'
            ].slice(0, Math.floor(Math.random() * 4) + 1)
          };
        }
      })
    );

    return enhancedProducts;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }
};

// Function to fetch featured products
export const fetchFeaturedProducts = async (count: number = 4): Promise<Product[]> => {
  try {
    // Pokud je aktivní Medusa backend, použijeme ho
    if (USE_MEDUSA) {
      console.log(`[Database] Using Medusa backend for fetching ${count} featured products`);
      return await medusaService.fetchFeaturedProducts(count);
    }

    console.log(`[Database] Using mock data for fetching ${count} featured products`);
    // Get basic featured products
    const featuredProducts = mockProducts.slice(0, count);

    // For each product, fetch additional data from API
    const enhancedProducts = await Promise.all(
      featuredProducts.map(async (product) => {
        try {
          console.log(`Fetching additional data for product ID: ${product.id}`);

          // Map product ID to the format expected by the API
          let apiProductId = product.id;

          // Check if we need to map the ID
          if (product.id.includes('-')) {
            // This is a mapping from product IDs like "nt-105" to numeric IDs like "1"
            const idMapping: Record<string, string> = {
              'nt-105': '1',
              'tz-250': '2',
              'ot-120': '3',
              'tz-5': '4',
              'tp-100': '5',
              'vt-cash': '6',
              'th-2m': '7',
              'nt-100': '8'
            };

            // Use the mapping if available, otherwise fall back to the original ID
            apiProductId = idMapping[product.id] || product.id;
          }

          console.log(`Mapped product ID for API: ${apiProductId} (original: ${product.id})`);

          // Fetch certification data
          const certification = await safeCertificationApi.getByProductId(apiProductId);

          // Fetch dimensions data - external
          const externalDimensions = await safeDimensionsApi.getByProductId(apiProductId, false);

          // Fetch dimensions data - internal
          const internalDimensions = await safeDimensionsApi.getByProductId(apiProductId, true);

          // Fetch interior features
          const interior = await safeInteriorApi.getByProductId(apiProductId);

          return {
            ...product,
            // Add certification details from API
            certificationStandard: certification?.standard || 'ČSN EN 1143-1',
            certificationLevel: certification?.level || product.safeClass,
            securityClassification: certification?.classification || (product.safeClass ? `Třída ${product.safeClass}` : undefined),
            recommendedInsurance: certification?.recommended_insurance || undefined,

            // Add dimensions from API
            dimensions: externalDimensions ? {
              width: externalDimensions.width / 10, // Convert mm to cm for display
              height: externalDimensions.height / 10,
              depth: externalDimensions.depth / 10
            } : product.dimensions,

            // Add internal dimensions from API
            internalDimensions: internalDimensions ? {
              width: internalDimensions.width,
              height: internalDimensions.height,
              depth: internalDimensions.depth
            } : (product.dimensions ? {
              // Fallback calculation if API fails
              width: product.dimensions.width * 10 - 40, // Convert cm to mm and subtract walls
              height: product.dimensions.height * 10 - 40,
              depth: product.dimensions.depth * 10 - 40
            } : undefined),

            // Add interior features from API
            hooks: interior?.hooks || Math.floor(Math.random() * 10) + 1,
            shelves: interior?.shelves || Math.floor(Math.random() * 3) + 1,
            interiorFeatures: interior?.features || [
              'Vnitřní osvětlení LED',
              'Kotvící otvory',
              'Protipožární izolace',
              'Nastavitelné police'
            ].slice(0, Math.floor(Math.random() * 4) + 1)
          };
        } catch (apiError) {
          console.error(`Error fetching additional data for product ${product.id}:`, apiError);

          // Fallback to basic product with calculated values
          const externalWidth = product.dimensions?.width || 0;
          const externalHeight = product.dimensions?.height || 0;
          const externalDepth = product.dimensions?.depth || 0;
          const wallThickness = 20; // 20mm wall thickness

          return {
            ...product,
            certificationStandard: 'ČSN EN 1143-1',
            securityClassification: product.safeClass ? `Třída ${product.safeClass}` : undefined,
            internalDimensions: {
              width: Math.max(0, externalWidth * 10 - wallThickness * 2),
              height: Math.max(0, externalHeight * 10 - wallThickness * 2),
              depth: Math.max(0, externalDepth * 10 - wallThickness * 2)
            },
            hooks: Math.floor(Math.random() * 10) + 1,
            shelves: Math.floor(Math.random() * 3) + 1,
            interiorFeatures: [
              'Vnitřní osvětlení LED',
              'Kotvící otvory',
              'Protipožární izolace',
              'Nastavitelné police'
            ].slice(0, Math.floor(Math.random() * 4) + 1)
          };
        }
      })
    );

    return enhancedProducts;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

// Function to fetch related products
export const fetchRelatedProducts = async (
  currentProductId: string,
  category: string,
  count: number = 4
): Promise<Product[]> => {
  try {
    // Pokud je aktivní Medusa backend, použijeme ho
    if (USE_MEDUSA) {
      console.log(`[Database] Using Medusa backend for fetching related products for product ${currentProductId} in category ${category}`);
      // Získáme produkty podle kategorie a vyfiltrujeme aktuální produkt
      const categoryProducts = await medusaService.fetchProductsByCategory(category);
      const relatedProducts = categoryProducts
        .filter(p => p.id !== currentProductId)
        .slice(0, count);
      return relatedProducts;
    }

    console.log(`[Database] Using mock data for fetching related products for product ${currentProductId} in category ${category}`);
    // Get basic related products
    const relatedProducts = mockProducts
      .filter(p => p.category === category && p.id !== currentProductId)
      .slice(0, count);

    // For each product, fetch additional data from API
    const enhancedProducts = await Promise.all(
      relatedProducts.map(async (product) => {
        try {
          console.log(`Fetching additional data for product ID: ${product.id}`);

          // Map product ID to the format expected by the API
          let apiProductId = product.id;

          // Check if we need to map the ID
          if (product.id.includes('-')) {
            // This is a mapping from product IDs like "nt-105" to numeric IDs like "1"
            const idMapping: Record<string, string> = {
              'nt-105': '1',
              'tz-250': '2',
              'ot-120': '3',
              'tz-5': '4',
              'tp-100': '5',
              'vt-cash': '6',
              'th-2m': '7',
              'nt-100': '8'
            };

            // Use the mapping if available, otherwise fall back to the original ID
            apiProductId = idMapping[product.id] || product.id;
          }

          console.log(`Mapped product ID for API: ${apiProductId} (original: ${product.id})`);

          // Fetch certification data
          const certification = await safeCertificationApi.getByProductId(apiProductId);

          // Fetch dimensions data - external
          const externalDimensions = await safeDimensionsApi.getByProductId(apiProductId, false);

          // Fetch dimensions data - internal
          const internalDimensions = await safeDimensionsApi.getByProductId(apiProductId, true);

          // Fetch interior features
          const interior = await safeInteriorApi.getByProductId(apiProductId);

          return {
            ...product,
            // Add certification details from API
            certificationStandard: certification?.standard || 'ČSN EN 1143-1',
            certificationLevel: certification?.level || product.safeClass,
            securityClassification: certification?.classification || (product.safeClass ? `Třída ${product.safeClass}` : undefined),
            recommendedInsurance: certification?.recommended_insurance || undefined,

            // Add dimensions from API
            dimensions: externalDimensions ? {
              width: externalDimensions.width / 10, // Convert mm to cm for display
              height: externalDimensions.height / 10,
              depth: externalDimensions.depth / 10
            } : product.dimensions,

            // Add internal dimensions from API
            internalDimensions: internalDimensions ? {
              width: internalDimensions.width,
              height: internalDimensions.height,
              depth: internalDimensions.depth
            } : (product.dimensions ? {
              // Fallback calculation if API fails
              width: product.dimensions.width * 10 - 40, // Convert cm to mm and subtract walls
              height: product.dimensions.height * 10 - 40,
              depth: product.dimensions.depth * 10 - 40
            } : undefined),

            // Add interior features from API
            hooks: interior?.hooks || Math.floor(Math.random() * 10) + 1,
            shelves: interior?.shelves || Math.floor(Math.random() * 3) + 1,
            interiorFeatures: interior?.features || [
              'Vnitřní osvětlení LED',
              'Kotvící otvory',
              'Protipožární izolace',
              'Nastavitelné police'
            ].slice(0, Math.floor(Math.random() * 4) + 1)
          };
        } catch (apiError) {
          console.error(`Error fetching additional data for product ${product.id}:`, apiError);

          // Fallback to basic product with calculated values
          const externalWidth = product.dimensions?.width || 0;
          const externalHeight = product.dimensions?.height || 0;
          const externalDepth = product.dimensions?.depth || 0;
          const wallThickness = 20; // 20mm wall thickness

          return {
            ...product,
            certificationStandard: 'ČSN EN 1143-1',
            securityClassification: product.safeClass ? `Třída ${product.safeClass}` : undefined,
            internalDimensions: {
              width: Math.max(0, externalWidth * 10 - wallThickness * 2),
              height: Math.max(0, externalHeight * 10 - wallThickness * 2),
              depth: Math.max(0, externalDepth * 10 - wallThickness * 2)
            },
            hooks: Math.floor(Math.random() * 10) + 1,
            shelves: Math.floor(Math.random() * 3) + 1,
            interiorFeatures: [
              'Vnitřní osvětlení LED',
              'Kotvící otvory',
              'Protipožární izolace',
              'Nastavitelné police'
            ].slice(0, Math.floor(Math.random() * 4) + 1)
          };
        }
      })
    );

    return enhancedProducts;
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
};
