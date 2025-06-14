// resources/js/utils/api.js
import axios from 'axios';

const API_PREFIX = '/api';

export const apiRoutes = {
  login: '/login',
  logout: '/logout',
  me: '/me',
  profileUpdate: '/profile/update',
  permits: '/permits',
  products: '/products', // <-- added products route
};

export const webRoutes = {
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  adminDashboard: '/admin/dashboard',
  forgotPassword: '/forgot-password',
};

// Axios instance WITH baseURL set to API_PREFIX
const api = axios.create({
  baseURL: API_PREFIX,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Set token to Authorization header for all future requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const login = async ({ email, password }) => {
  const response = await api.post(apiRoutes.login, { email, password });

  const { access_token, user } = response.data;

  if (access_token) {
    localStorage.setItem('auth_token', access_token);
    setAuthToken(access_token);
  }

  const redirect = user?.role === 'admin' ? webRoutes.adminDashboard : webRoutes.dashboard;

  window.location.href = redirect;
};

// ✅ Fetch the current user info with token from api/me
export const fetchCurrentUser = async () => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('No auth token found');

    setAuthToken(token);
    const response = await api.get(apiRoutes.me);
    return response.data; // user data from backend
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

/**
 * Add a new product
 * Supports both URL images (JSON) and file uploads (FormData)
 * @param {Object} productData
 *   {
 *     name: string,
 *     price: number,
 *     discount?: number,
 *     category: string,
 *     shortDescription?: string,
 *     details?: string,
 *     imageInputType: 'url' | 'upload',
 *     images?: string[],            // required if imageInputType === 'url'
 *     uploadedImages?: File[],      // required if imageInputType === 'upload'
 *   }
 * @returns {Promise} axios response promise
 */
export const addProduct = async (productData) => {
  if (productData.imageInputType === 'upload' && productData.uploadedImages?.length) {
    // Use FormData for file uploads
    const formData = new FormData();

    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('discount', productData.discount || 0);
    formData.append('category', productData.category);
    formData.append('shortDescription', productData.shortDescription || '');
    formData.append('details', productData.details || '');
    formData.append('imageInputType', 'upload');

    productData.uploadedImages.forEach((file) => {
      formData.append('uploadedImages[]', file);
    });

    return api.post(apiRoutes.products, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } else {
    // Default: JSON request for URL images
    const payload = {
      name: productData.name,
      price: productData.price,
      discount: productData.discount || 0,
      category: productData.category,
      shortDescription: productData.shortDescription || '',
      details: productData.details || '',
      imageInputType: 'url',
      images: productData.images || [],
    };

    return api.post(apiRoutes.products, payload);
  }
};

export default api;
