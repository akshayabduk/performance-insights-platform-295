import axios from 'axios';

/**
 * API Client configured to communicate with backend using an environment-based base URL.
 * - Reads base URL from REACT_APP_API_BASE_URL.
 * - Attaches Authorization header if a token is present in localStorage.
 * - Exposes typed helper methods for core app features.
 */

const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Attach auth token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// PUBLIC_INTERFACE
export async function login(email, password) {
  /** Authenticate a user and return { token, user: { id, name, email, role } } */
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

// PUBLIC_INTERFACE
export async function getCurrentUser() {
  /** Fetch the current authenticated user's profile and role. */
  const { data } = await api.get('/auth/me');
  return data;
}

// PUBLIC_INTERFACE
export async function getAnalyticsOverview() {
  /** Get analytics overview for dashboard cards and charts. */
  const { data } = await api.get('/analytics/overview');
  return data;
}

// PUBLIC_INTERFACE
export async function getPerformanceHistory(params = {}) {
  /** Fetch paginated performance history for the current (or specified) user/team. */
  const { data } = await api.get('/performance/history', { params });
  return data;
}

// PUBLIC_INTERFACE
export async function getNotifications() {
  /** Get notifications for the current user. */
  const { data } = await api.get('/notifications');
  return data;
}

// PUBLIC_INTERFACE
export async function markNotificationRead(notificationId) {
  /** Mark a notification as read. */
  const { data } = await api.post(`/notifications/${notificationId}/read`);
  return data;
}

export default api;
