// Este archivo se mantiene por compatibilidad, pero los servicios
// principales están ahora en api.js

import { authService as apiAuthService } from './api';

// Exportar funciones individuales
export const login = apiAuthService.login;
export const register = apiAuthService.register;
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};
export const getCurrentUser = apiAuthService.getCurrentUser;
export const updateProfile = apiAuthService.updateProfile;
export const changePassword = apiAuthService.changePassword;
export const forgotPassword = apiAuthService.forgotPassword;
export const resetPassword = apiAuthService.resetPassword;

// También exportar el servicio completo
export { apiAuthService as authService };

// Exportación por defecto
const authServiceDefault = {
    register,
    login,
    logout,
    getCurrentUser,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword
};

export default authServiceDefault;