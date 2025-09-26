import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar autenticación al cargar la app
    useEffect(() => {
        let isMounted = true;

        const initAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await authService.getCurrentUser();
                    if (isMounted && response && response.success) {
                        setUser(response.data);
                        setIsAuthenticated(true);
                    } else if (isMounted) {
                        localStorage.removeItem('token');
                    }
                }
            } catch (error) {
                console.error('Error verificando autenticación:', error);
                if (isMounted) {
                    localStorage.removeItem('token');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        initAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    const login = useCallback(async (credentials) => {
        try {
            setLoading(true);
            const response = await authService.login(credentials);

            if (response.success && response.token) {
                localStorage.setItem('token', response.token);
                setUser(response.user);
                setIsAuthenticated(true);

                toast.success(`¡Bienvenido de vuelta, ${response.user.firstName || response.user.username}!`);

                // La navegación se manejará en los componentes

                return { success: true };
            } else {
                throw new Error(response.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Error al iniciar sesión';
            toast.error(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (userData) => {
        try {
            setLoading(true);
            const response = await authService.register(userData);

            if (response.success) {
                toast.success('¡Cuenta creada exitosamente! Por favor inicia sesión.');
                return { success: true };
            } else {
                throw new Error(response.message || 'Error al registrar usuario');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Error al registrar usuario';
            toast.error(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        toast.success('Sesión cerrada exitosamente');
    }, []);

    const updateProfile = useCallback(async (profileData) => {
        try {
            setLoading(true);
            const response = await authService.updateProfile(profileData);

            if (response.success) {
                setUser(response.user);
                toast.success('Perfil actualizado exitosamente');
                return { success: true };
            } else {
                throw new Error(response.message || 'Error al actualizar perfil');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Error al actualizar perfil';
            toast.error(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    const changePassword = useCallback(async (passwordData) => {
        try {
            setLoading(true);
            const response = await authService.changePassword(passwordData);

            if (response.success) {
                toast.success('Contraseña actualizada exitosamente');
                return { success: true };
            } else {
                throw new Error(response.message || 'Error al cambiar contraseña');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Error al cambiar contraseña';
            toast.error(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshUser = useCallback(async () => {
        try {
            const userData = await authService.getCurrentUser();
            if (userData) {
                setUser(userData);
                return userData;
            }
        } catch (error) {
            console.error('Error refrescando usuario:', error);
        }
    }, []);

    // Verificar si el usuario tiene un rol específico
    const hasRole = useCallback((role) => {
        return user?.role === role;
    }, [user]);

    // Verificar si el usuario tiene alguno de los roles especificados
    const hasAnyRole = useCallback((roles) => {
        return roles.includes(user?.role);
    }, [user]);

    // Verificar si es un organizador (incluye cumpleañero, planeador_bodas, organizador)
    const isOrganizer = useCallback(() => {
        return hasAnyRole(['cumpleañero', 'planeador_bodas', 'organizador']);
    }, [hasAnyRole]);

    // Verificar si es un proveedor
    const isProvider = useCallback(() => {
        return hasRole('proveedor');
    }, [hasRole]);

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        refreshUser,
        hasRole,
        hasAnyRole,
        isOrganizer,
        isProvider
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

// Exportar también el contexto para compatibilidad
export { AuthContext };