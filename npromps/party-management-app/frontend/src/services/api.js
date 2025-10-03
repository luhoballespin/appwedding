import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configuración de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos timeout
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast.error('Sesión expirada. Por favor inicia sesión nuevamente.');
    } else if (error.response?.status === 403) {
      toast.error('No tienes permisos para realizar esta acción.');
    } else if (error.response?.status === 429) {
      toast.error('Demasiadas solicitudes. Intenta más tarde.');
    } else if (error.response?.status >= 500) {
      toast.error('Error del servidor. Intenta más tarde.');
    }

    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.put('/users/change-password', passwordData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  }
};

// Servicios de eventos
export const eventService = {
  getUserEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },

  getEventById: async (eventId) => {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  updateEvent: async (eventId, eventData) => {
    const response = await api.put(`/events/${eventId}`, eventData);
    return response.data;
  },

  deleteEvent: async (eventId) => {
    const response = await api.delete(`/events/${eventId}`);
    return response.data;
  },

  addGuest: async (eventId, guestData) => {
    const response = await api.post(`/events/${eventId}/guests`, guestData);
    return response.data;
  },

  updateGuestStatus: async (eventId, guestId, status) => {
    const response = await api.put(`/events/${eventId}/guests/${guestId}`, { status });
    return response.data;
  },

  addChecklistItem: async (eventId, taskData) => {
    const response = await api.post(`/events/${eventId}/checklist`, taskData);
    return response.data;
  },

  completeChecklistItem: async (eventId, taskId) => {
    const response = await api.put(`/events/${eventId}/checklist/${taskId}/complete`);
    return response.data;
  },

  addProvider: async (eventId, providerData) => {
    const response = await api.post(`/events/${eventId}/providers`, providerData);
    return response.data;
  },

  updateProviderStatus: async (eventId, providerId, status) => {
    const response = await api.put(`/events/${eventId}/providers/${providerId}/status`, { status });
    return response.data;
  },

  updateProviderPayment: async (eventId, providerId, paymentData) => {
    const response = await api.put(`/events/${eventId}/providers/${providerId}/payment`, paymentData);
    return response.data;
  },

  addProviderDocument: async (eventId, providerId, documentData) => {
    const response = await api.post(`/events/${eventId}/providers/${providerId}/documents`, documentData);
    return response.data;
  },

  removeProvider: async (eventId, providerId) => {
    const response = await api.delete(`/events/${eventId}/providers/${providerId}`);
    return response.data;
  },

  getAvailableProviders: async (eventId, params = {}) => {
    const response = await api.get(`/events/${eventId}/providers/available`, { params });
    return response.data;
  }
};

// Servicios de pagos
export const paymentService = {
  createPayment: async (eventId, paymentData) => {
    const response = await api.post(`/payments/events/${eventId}`, paymentData);
    return response.data;
  },

  getUserPayments: async () => {
    const response = await api.get('/payments');
    return response.data;
  },

  getPaymentById: async (paymentId) => {
    const response = await api.get(`/payments/${paymentId}`);
    return response.data;
  },

  distributePayments: async (paymentId, providerId = null) => {
    const response = await api.post(`/payments/${paymentId}/distribute`, { providerId });
    return response.data;
  },

  processRefund: async (paymentId, refundData) => {
    const response = await api.post(`/payments/${paymentId}/refund`, refundData);
    return response.data;
  },

  getPaymentStats: async () => {
    const response = await api.get('/payments/admin/stats');
    return response.data;
  }
};

// Servicios de proveedores
export const providerService = {
  getProviders: async (params = {}) => {
    const response = await api.get('/providers', { params });
    return response.data;
  },

  getProviderById: async (providerId) => {
    const response = await api.get(`/providers/${providerId}`);
    return response.data;
  },

  createProvider: async (providerData) => {
    const response = await api.post('/providers', providerData);
    return response.data;
  },

  updateProvider: async (providerId, providerData) => {
    const response = await api.put(`/providers/${providerId}`, providerData);
    return response.data;
  },

  deleteProvider: async (providerId) => {
    const response = await api.delete(`/providers/${providerId}`);
    return response.data;
  },

  searchProviders: async (searchParams) => {
    const response = await api.get('/providers/search', { params: searchParams });
    return response.data;
  },

  getProviderRequests: async (providerId) => {
    const response = await api.get(`/providers/${providerId}/requests`);
    return response.data;
  },

  updateRequestStatus: async (providerId, requestId, status) => {
    const response = await api.put(`/providers/${providerId}/requests/${requestId}`, { status });
    return response.data;
  }
};

// Servicios de usuarios
export const userService = {
  getUserProfile: async (userId = null) => {
    const endpoint = userId ? `/users/profile/${userId}` : '/users/profile';
    const response = await api.get(endpoint);
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.put('/users/change-password', passwordData);
    return response.data;
  },

  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getUserStats: async (userId = null) => {
    const endpoint = userId ? `/users/stats/${userId}` : '/users/stats';
    const response = await api.get(endpoint);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await api.delete('/users/account');
    return response.data;
  },

  // Alias para compatibilidad
  updateUserProfile: async (profileData) => {
    return userService.updateProfile(profileData);
  }
};

// Utilidades
export const apiUtils = {
  handleError: (error) => {
    const message = error.response?.data?.message || error.message || 'Error desconocido';
    toast.error(message);
    return message;
  },

  getErrorMessage: (error) => {
    return error.response?.data?.message || error.message || 'Error desconocido';
  }
};

export default api;