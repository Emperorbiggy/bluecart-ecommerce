const API_PREFIX = '/api';

export const apiRoutes = {
  login: `${API_PREFIX}/login`,
  logout: `${API_PREFIX}/logout`,
  me: `${API_PREFIX}/me`,
  profileUpdate: `${API_PREFIX}/profile/update`,
  permits: `${API_PREFIX}/permits`,
};

export const webRoutes = {
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  adminDashboard: '/admin/dashboard',
  forgotPassword: '/forgot-password',
};
