// resources/js/utils/api.js
import axios from 'axios';

const API_PREFIX = '/api';

export const apiRoutes = {
  login: '/login',
  logout: '/logout',
  me: '/me',
  profileUpdate: '/profile/update',
  permits: '/permits',
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

export default api;
