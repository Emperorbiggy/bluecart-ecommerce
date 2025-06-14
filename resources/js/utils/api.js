import axios from 'axios';

const API_PREFIX = '/api';

export const apiRoutes = {
  login: '/login',
  logout: '/logout',
  me: '/me',
  profileUpdate: '/profile/update',
  permits: '/permits',
  products: '/products',
  relatedProducts: (id) => `/products/${id}/related`, // 🔥 NEW
}


export const webRoutes = {
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  adminDashboard: '/admin/dashboard',
  forgotPassword: '/forgot-password',
  products: '/products',
};

const api = axios.create({
  baseURL: API_PREFIX,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Set Authorization token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

const initToken = () => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    setAuthToken(token);
  }
};
initToken();

// -------------------- AUTH --------------------
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

export const fetchCurrentUser = async () => {
  try {
    const response = await api.get(apiRoutes.me);
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

// -------------------- PRODUCTS --------------------
export const getAllProducts = async () => {
  try {
    const response = await api.get(apiRoutes.products);
    const products = response.data.products;

    return products.map((product) => ({
      ...product,
      images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getRelatedProducts = async (id) => {
  try {
    const response = await api.get(apiRoutes.relatedProducts(id));
    const products = response.data;

    return products.map((product) => ({
      ...product,
      images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
    }));
  } catch (error) {
    console.error('Error fetching related products:', error);
    throw error;
  }
}


export const getProductById = async (id) => {
  try {
    const response = await api.get(`${apiRoutes.products}/${id}`)
    const product = response.data.product

    return {
      ...product,
      images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    throw error
  }
}


/**
 * Add a new product
 */
export const addProduct = async (productData) => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No auth token found. Please log in.');
  }
  setAuthToken(token);

  if (productData.imageInputType === 'upload' && productData.uploadedImages?.length) {
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

/**
 * Update an existing product by ID
 * @param {string|number} id - Product ID
 * @param {Object} data - Fields to update (name, price, category, etc.)
 */
export const updateProduct = async (id, data) => {
  try {
    const token = localStorage.getItem('auth_token')
    if (!token) throw new Error('No auth token found. Please log in.')
    setAuthToken(token)

    let response
    const isFormData = data instanceof FormData

    if (isFormData) {
      response = await api.post(`${apiRoutes.products}/${id}?_method=PUT`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } else {
      response = await api.put(`${apiRoutes.products}/${id}`, data)
    }

    return response.data
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}


export default api;
