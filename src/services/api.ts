import axios from 'axios';
import medusaClient from './medusa-client';

// Vytvoření instance Axios s výchozí konfigurací
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9000',
  headers: {
    'Content-Type': 'application/json',
  },
  // Nastavení timeoutu na 5 sekund
  timeout: 5000,
});

// Výpis aktuální konfigurace pro debugging
console.log(`[API Config] Using baseURL: ${import.meta.env.VITE_API_URL || 'http://localhost:9000'}`);
console.log(`[API Config] Environment variables:`, {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_MEDUSA_BACKEND_URL: import.meta.env.VITE_MEDUSA_BACKEND_URL,
});

// Interceptor pro přidání autentizačního tokenu a logování požadavků
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.params || {});

    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Interceptor pro logování odpovědí
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
      response.data ? 'Data received' : 'No data');
    return response;
  },
  (error) => {
    if (error.response) {
      // Server vrátil odpověď s chybovým stavovým kódem
      console.error(`[API Error] ${error.response.status} ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        error.response.data);
    } else if (error.request) {
      // Požadavek byl odeslán, ale nedošla žádná odpověď
      console.error(`[API Error] No response received for ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        error.request);
    } else {
      // Něco se pokazilo při nastavování požadavku
      console.error('[API Error] Request setup error', error.message);
    }
    return Promise.reject(error);
  }
);

// API funkce pro produkty
export const productApi = {
  getProducts: async (params = {}) => {
    const response = await api.get('/store/products', { params });
    return response.data;
  },

  getProduct: async (id: string) => {
    const response = await api.get(`/store/products/${id}`);
    return response.data;
  },

  getProductByHandle: async (handle: string) => {
    const response = await api.get(`/store/products`, { params: { handle } });
    return response.data.products[0] || null;
  },
};

// API funkce pro bezpečnostní certifikace
export const safeCertificationApi = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/store/safe-certifications', { params });
      return response.data.certifications;
    } catch (error) {
      console.error('Error fetching all certifications:', error);
      return null;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/store/safe-certifications/${id}`);
      return response.data.certification;
    } catch (error) {
      console.error(`Error fetching certification with ID ${id}:`, error);
      return null;
    }
  },

  getByProductId: async (productId: string) => {
    try {
      // Přidáno více logování pro debugging
      console.log(`API call: GET /store/safe-certifications/product/${productId}`);

      // Přidáno ošetření chyb a timeout
      const response = await api.get(`/store/safe-certifications/product/${productId}`, {
        timeout: 3000, // 3 sekundy timeout pro tento konkrétní požadavek
      });

      console.log(`API response for certification:`, response.data);

      if (!response.data || !response.data.certification) {
        console.warn(`No certification data received for product ${productId}`);
        return null;
      }

      return response.data.certification;
    } catch (error) {
      console.error(`Error fetching certification for product ${productId}:`, error);
      // Přidáno více detailů o chybě
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(`Status: ${error.response.status}, Data:`, error.response.data);
        } else if (error.request) {
          console.error('No response received from server');
        }
      }
      return null;
    }
  },
};

// API funkce pro rozměry sejfu
export const safeDimensionsApi = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/store/safe-dimensions', { params });
      return response.data.dimensions;
    } catch (error) {
      console.error('Error fetching all dimensions:', error);
      return null;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/store/safe-dimensions/${id}`);
      return response.data.dimension;
    } catch (error) {
      console.error(`Error fetching dimension with ID ${id}:`, error);
      return null;
    }
  },

  getByProductId: async (productId: string, isInternal = false) => {
    try {
      // Přidáno více logování pro debugging
      console.log(`API call: GET /store/safe-dimensions/product/${productId}?isInternal=${isInternal}`);

      // Přidáno ošetření chyb a timeout
      const response = await api.get(`/store/safe-dimensions/product/${productId}`, {
        params: { isInternal },
        timeout: 3000, // 3 sekundy timeout pro tento konkrétní požadavek
      });

      console.log(`API response for dimensions (isInternal=${isInternal}):`, response.data);

      if (!response.data || !response.data.dimension) {
        console.warn(`No dimension data received for product ${productId} (isInternal=${isInternal})`);
        return null;
      }

      return response.data.dimension;
    } catch (error) {
      console.error(`Error fetching dimensions for product ${productId} (isInternal=${isInternal}):`, error);
      // Přidáno více detailů o chybě
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(`Status: ${error.response.status}, Data:`, error.response.data);
        } else if (error.request) {
          console.error('No response received from server');
        }
      }
      return null;
    }
  },
};

// API funkce pro vnitřní vybavení sejfu
export const safeInteriorApi = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/store/safe-interiors', { params });
      return response.data.interiors;
    } catch (error) {
      console.error('Error fetching all interiors:', error);
      return null;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/store/safe-interiors/${id}`);
      return response.data.interior;
    } catch (error) {
      console.error(`Error fetching interior with ID ${id}:`, error);
      return null;
    }
  },

  getByProductId: async (productId: string) => {
    try {
      // Přidáno více logování pro debugging
      console.log(`API call: GET /store/safe-interiors/product/${productId}`);

      // Přidáno ošetření chyb a timeout
      const response = await api.get(`/store/safe-interiors/product/${productId}`, {
        timeout: 3000, // 3 sekundy timeout pro tento konkrétní požadavek
      });

      console.log(`API response for interior:`, response.data);

      if (!response.data || !response.data.interior) {
        console.warn(`No interior data received for product ${productId}`);
        return null;
      }

      return response.data.interior;
    } catch (error) {
      console.error(`Error fetching interior for product ${productId}:`, error);
      // Přidáno více detailů o chybě
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(`Status: ${error.response.status}, Data:`, error.response.data);
        } else if (error.request) {
          console.error('No response received from server');
        }
      }
      return null;
    }
  },
};

// API funkce pro košík
export const cartApi = {
  getCart: async () => {
    const cartId = localStorage.getItem('cart_id');
    if (!cartId) return null;

    const response = await api.get(`/store/carts/${cartId}`);
    return response.data.cart;
  },

  createCart: async () => {
    const response = await api.post('/store/carts');
    localStorage.setItem('cart_id', response.data.cart.id);
    return response.data.cart;
  },

  addItem: async (cartId: string, variantId: string, quantity: number) => {
    const response = await api.post(`/store/carts/${cartId}/line-items`, {
      variant_id: variantId,
      quantity,
    });
    return response.data.cart;
  },

  updateItem: async (cartId: string, lineId: string, quantity: number) => {
    const response = await api.post(`/store/carts/${cartId}/line-items/${lineId}`, {
      quantity,
    });
    return response.data.cart;
  },

  removeItem: async (cartId: string, lineId: string) => {
    const response = await api.delete(`/store/carts/${cartId}/line-items/${lineId}`);
    return response.data.cart;
  },
};

// API funkce pro objednávky
export const orderApi = {
  createOrder: async (cartId: string) => {
    const response = await api.post(`/store/carts/${cartId}/complete`);
    localStorage.removeItem('cart_id');
    return response.data.order;
  },

  getOrder: async (id: string) => {
    const response = await api.get(`/store/orders/${id}`);
    return response.data.order;
  },

  getOrders: async () => {
    const response = await api.get('/store/customers/me/orders');
    return response.data.orders;
  },
};

// API funkce pro autentizaci
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/store/auth', { email, password });
    localStorage.setItem('auth_token', response.data.access_token);
    return response.data.customer;
  },

  register: async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await api.post('/store/customers', {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
    return response.data.customer;
  },

  logout: async () => {
    localStorage.removeItem('auth_token');
    return true;
  },

  getProfile: async () => {
    const response = await api.get('/store/customers/me');
    return response.data.customer;
  },

  updateProfile: async (data: any) => {
    const response = await api.post('/store/customers/me', data);
    return response.data.customer;
  },
};

// Export všech API funkcí včetně Medusa klienta
export default {
  // Původní API funkce
  product: productApi,
  safeCertification: safeCertificationApi,
  safeDimensions: safeDimensionsApi,
  safeInterior: safeInteriorApi,
  cart: cartApi,
  order: orderApi,
  auth: authApi,

  // Medusa API funkce
  medusa: medusaClient,
};
