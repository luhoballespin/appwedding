import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si se especificaron roles permitidos, verificar que el usuario tenga uno de esos roles
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <div className="container-elegant py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">
            Acceso Restringido
          </h1>
          <p className="text-secondary-600 mb-8">
            No tienes permisos para acceder a esta sección.
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn-primary"
          >
            Volver Atrás
          </button>
        </div>
      </div>
    );
  }

  // Si todo está bien, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;
