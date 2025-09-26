import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    HeartIcon,
    UserIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    CalendarDaysIcon,
    UserGroupIcon,
    BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, isAuthenticated, logout, isOrganizer, isProvider } = useAuth();
    // const navigate = useNavigate(); // Para uso futuro
    const location = useLocation();

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        window.location.href = '/'; // Redirigir a home después del logout
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const getRoleIcon = () => {
        switch (user?.role) {
            case 'planeador_bodas':
                return <HeartIcon className="w-5 h-5 text-primary-600" />;
            case 'organizador':
                return <UserGroupIcon className="w-5 h-5 text-primary-600" />;
            case 'proveedor':
                return <BuildingOfficeIcon className="w-5 h-5 text-primary-600" />;
            default:
                return <CalendarDaysIcon className="w-5 h-5 text-primary-600" />;
        }
    };

    const getRoleLabel = () => {
        switch (user?.role) {
            case 'planeador_bodas':
                return 'Wedding Planner';
            case 'organizador':
                return 'Organizador';
            case 'proveedor':
                return 'Proveedor';
            default:
                return 'Organizador';
        }
    };

    return (
        <header className="bg-white shadow-soft border-b border-secondary-100 sticky top-0 z-50">
            <div className="container-elegant">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <HeartIcon className="w-8 h-8 text-primary-600 group-hover:scale-110 transition-transform duration-200" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                                Wedding Planner
                            </h1>
                            <p className="text-xs text-secondary-500 -mt-1">Tu evento perfecto</p>
                        </div>
                    </Link>

                    {/* Navegación Desktop */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {isAuthenticated ? (
                            <>
                                {isOrganizer() && (
                                    <>
                                        <Link
                                            to="/dashboard"
                                            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/events"
                                            className={`nav-link ${isActive('/events') ? 'active' : ''}`}
                                        >
                                            Mis Eventos
                                        </Link>
                                        <Link
                                            to="/providers"
                                            className={`nav-link ${isActive('/providers') ? 'active' : ''}`}
                                        >
                                            Proveedores
                                        </Link>
                                    </>
                                )}

                                {isProvider() && (
                                    <>
                                        <Link
                                            to="/provider-dashboard"
                                            className={`nav-link ${isActive('/provider-dashboard') ? 'active' : ''}`}
                                        >
                                            Mi Panel
                                        </Link>
                                        <Link
                                            to="/provider-services"
                                            className={`nav-link ${isActive('/provider-services') ? 'active' : ''}`}
                                        >
                                            Mis Servicios
                                        </Link>
                                        <Link
                                            to="/provider-requests"
                                            className={`nav-link ${isActive('/provider-requests') ? 'active' : ''}`}
                                        >
                                            Solicitudes
                                        </Link>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <Link to="/" className="nav-link">Inicio</Link>
                                <Link to="/providers" className="nav-link">Proveedores</Link>
                                <Link to="/about" className="nav-link">Acerca de</Link>
                            </>
                        )}
                    </nav>

                    {/* Botones de acción */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="relative">
                                {/* Perfil del usuario */}
                                <button
                                    onClick={toggleProfile}
                                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-secondary-50 transition-colors group"
                                >
                                    <div className="relative">
                                        {user?.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt={user.fullName}
                                                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-100 group-hover:ring-primary-300 transition-all"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                                                <UserIcon className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                        <div className="absolute -bottom-1 -right-1">
                                            {getRoleIcon()}
                                        </div>
                                    </div>

                                    <div className="hidden lg:block text-left">
                                        <p className="text-sm font-medium text-secondary-900">
                                            {user?.fullName || user?.username}
                                        </p>
                                        <p className="text-xs text-secondary-500">{getRoleLabel()}</p>
                                    </div>
                                </button>

                                {/* Menú desplegable del perfil */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-large border border-secondary-100 py-2 z-50">
                                        <div className="px-4 py-3 border-b border-secondary-100">
                                            <p className="text-sm font-medium text-secondary-900">
                                                {user?.fullName || user?.username}
                                            </p>
                                            <p className="text-xs text-secondary-500">{user?.email}</p>
                                        </div>

                                        <div className="py-2">
                                            <Link
                                                to="/profile"
                                                className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <UserIcon className="w-4 h-4 mr-3" />
                                                Mi Perfil
                                            </Link>

                                            <Link
                                                to="/settings"
                                                className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <Cog6ToothIcon className="w-4 h-4 mr-3" />
                                                Configuración
                                            </Link>

                                            <hr className="my-2 border-secondary-100" />

                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-danger-600 hover:bg-danger-50"
                                            >
                                                <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login" className="btn-ghost">
                                    Iniciar Sesión
                                </Link>
                                <Link to="/register" className="btn-primary">
                                    Registrarse
                                </Link>
                            </div>
                        )}

                        {/* Botón de menú móvil */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-xl hover:bg-secondary-50 transition-colors"
                        >
                            {isMenuOpen ? (
                                <XMarkIcon className="w-6 h-6 text-secondary-600" />
                            ) : (
                                <Bars3Icon className="w-6 h-6 text-secondary-600" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Menú móvil */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-secondary-100 py-4">
                        <nav className="flex flex-col space-y-2">
                            {isAuthenticated ? (
                                <>
                                    {isOrganizer() && (
                                        <>
                                            <Link
                                                to="/dashboard"
                                                className="nav-link"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                to="/events"
                                                className="nav-link"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Mis Eventos
                                            </Link>
                                            <Link
                                                to="/providers"
                                                className="nav-link"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Proveedores
                                            </Link>
                                        </>
                                    )}

                                    {isProvider() && (
                                        <>
                                            <Link
                                                to="/provider-dashboard"
                                                className="nav-link"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Mi Panel
                                            </Link>
                                            <Link
                                                to="/provider-services"
                                                className="nav-link"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Mis Servicios
                                            </Link>
                                            <Link
                                                to="/provider-requests"
                                                className="nav-link"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Solicitudes
                                            </Link>
                                        </>
                                    )}

                                    <hr className="my-2 border-secondary-100" />

                                    <Link
                                        to="/profile"
                                        className="nav-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Mi Perfil
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="nav-link text-danger-600 text-left"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                        Inicio
                                    </Link>
                                    <Link to="/providers" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                        Proveedores
                                    </Link>
                                    <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                        Acerca de
                                    </Link>

                                    <hr className="my-2 border-secondary-100" />

                                    <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                        Iniciar Sesión
                                    </Link>
                                    <Link to="/register" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;