import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Asegúrate de crear este archivo para los estilos

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>Fiesta Manager</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/register">Registro</Link>
                    </li>
                    <li>
                        <Link to="/login">Iniciar Sesión</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;