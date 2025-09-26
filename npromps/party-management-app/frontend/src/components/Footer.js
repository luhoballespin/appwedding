import React from 'react';
import { Link } from 'react-router-dom';
import {
    HeartIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-secondary-900 text-white">
            <div className="container-elegant py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo y Descripción */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <HeartIcon className="w-8 h-8 text-primary-400" />
                            <h3 className="text-xl font-bold">Wedding Planner</h3>
                        </div>
                        <p className="text-secondary-300 text-sm leading-relaxed">
                            La plataforma profesional para organizar eventos perfectos.
                            Conectamos organizadores con los mejores proveedores para
                            crear momentos inolvidables.
                        </p>
                    </div>

                    {/* Enlaces Rápidos */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Enlaces Rápidos</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/providers" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                                    Proveedores
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                                    Acerca de Nosotros
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Para Proveedores */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Para Proveedores</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/provider-register" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                                    Registrarse como Proveedor
                                </Link>
                            </li>
                            <li>
                                <Link to="/provider-benefits" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                                    Beneficios
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Contacto</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <EnvelopeIcon className="w-5 h-5 text-primary-400" />
                                <span className="text-secondary-300 text-sm">hola@weddingplanner.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <PhoneIcon className="w-5 h-5 text-primary-400" />
                                <span className="text-secondary-300 text-sm">+52 55 1234 5678</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPinIcon className="w-5 h-5 text-primary-400 mt-0.5" />
                                <span className="text-secondary-300 text-sm">
                                    Ciudad de México, México
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-secondary-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-secondary-300 text-sm">
                            © {currentYear} Wedding Planner. Todos los derechos reservados.
                        </div>
                        <div className="flex space-x-6">
                            <Link to="/privacy" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                                Política de Privacidad
                            </Link>
                            <Link to="/terms" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                                Términos de Servicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;