import axios from 'axios';

// Vytvoření instance Axios s výchozí konfigurací
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pro přidání autentizačního tokenu
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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
  getByProductId: async (productId: string) => {
    const response = await api.get(`/store/safe-certifications/product/${productId}`);
    return response.data.certification;
  },
};

// API funkce pro rozměry sejfu
export const safeDimensionsApi = {
  getByProductId: async (productId: string, isInternal = false) => {
    const response = await api.get(`/store/safe-dimensions/product/${productId}`, {
      params: { isInternal },
    });
    return response.data.dimensions;
  },
};

// API funkce pro vnitřní vybavení sejfu
export const safeInteriorApi = {
  getByProductId: async (productId: string) => {
    const response = await api.get(`/store/safe-interiors/product/${productId}`);
    return response.data.interior;
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

export default {
  product: productApi,
  safeCertification: safeCertificationApi,
  safeDimensions: safeDimensionsApi,
  safeInterior: safeInteriorApi,
  cart: cartApi,
  order: orderApi,
  auth: authApi,
};
