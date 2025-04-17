import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { login, register, logout } from '../services/authService';

const useAuth = () => {
    const { setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await fetchUser();
                setUser(user);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [setUser]);

    const fetchUser = async () => {
        // Implementar la lógica para obtener el usuario autenticado
    };

    const handleLogin = async (credentials) => {
        setLoading(true);
        try {
            const user = await login(credentials);
            setUser(user);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (userData) => {
        setLoading(true);
        try {
            const user = await register(userData);
            setUser(user);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    return {
        loading,
        error,
        handleLogin,
        handleRegister,
        handleLogout,
    };
};

export default useAuth;