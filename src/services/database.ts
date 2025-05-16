import { createClient } from '@supabase/supabase-js';
import { Product } from '@/types/product';
import { products as mockProducts } from '@/data/products';

// Supabase configuration
// In a real application, these would be environment variables
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to fetch all products from the database
export const fetchProducts = async (): Promise<Product[]> => {
  try {
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
    // In a real application, this would be a Supabase query
    // const { data, error } = await supabase
    //   .from('products')
    //   .select('*')
    //   .eq('slug', slug)
    //   .single();

    // if (error) throw error;
    // return data as Product;

    // For now, we'll simulate a database call
    const product = mockProducts.find(p => p.slug === slug);
    if (!product) return null;

    // Convert dimensions from cm to mm for internal dimensions
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
        width: Math.max(0, externalWidth * 10 - wallThickness * 2),
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
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
};

// Function to fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    // In a real application, this would be a Supabase query
    // const { data, error } = await supabase
    //   .from('products')
    //   .select('*')
    //   .eq('category', category);

    // if (error) throw error;
    // return data as Product[];

    // For now, we'll simulate a database call
    const filteredProducts = mockProducts.filter(p => p.category === category);

    return filteredProducts.map(product => {
      // Convert dimensions from cm to mm for internal dimensions
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
          width: Math.max(0, externalWidth * 10 - wallThickness * 2),
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
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }
};

// Function to fetch featured products
export const fetchFeaturedProducts = async (count: number = 4): Promise<Product[]> => {
  try {
    // In a real application, this would be a Supabase query
    // const { data, error } = await supabase
    //   .from('products')
    //   .select('*')
    //   .limit(count);

    // if (error) throw error;
    // return data as Product[];

    // For now, we'll simulate a database call
    return mockProducts.slice(0, count).map(product => {
      // Convert dimensions from cm to mm for internal dimensions
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
          width: Math.max(0, externalWidth * 10 - wallThickness * 2),
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
    // In a real application, this would be a Supabase query
    // const { data, error } = await supabase
    //   .from('products')
    //   .select('*')
    //   .eq('category', category)
    //   .neq('id', currentProductId)
    //   .limit(count);

    // if (error) throw error;
    // return data as Product[];

    // For now, we'll simulate a database call
    const relatedProducts = mockProducts
      .filter(p => p.category === category && p.id !== currentProductId)
      .slice(0, count);

    return relatedProducts.map(product => {
      // Convert dimensions from cm to mm for internal dimensions
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
          width: Math.max(0, externalWidth * 10 - wallThickness * 2),
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
    console.error('Error fetching related products:', error);
    return [];
  }
};
