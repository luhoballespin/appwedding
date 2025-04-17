import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Cambia el puerto según tu configuración

// Configuración de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Función para iniciar sesión
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Función para obtener eventos
export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

// Función para crear un nuevo evento
export const createEvent = async (eventData, token) => {
  const response = await api.post('/events', eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para obtener proveedores
export const getProviders = async () => {
  const response = await api.get('/providers');
  return response.data;
};

// Función para crear un nuevo proveedor
export const createProvider = async (providerData, token) => {
  const response = await api.post('/providers', providerData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para obtener el perfil del usuario
export const getUserProfile = async (token) => {
  const response = await api.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};