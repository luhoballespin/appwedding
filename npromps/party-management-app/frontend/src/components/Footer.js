import React from 'react';
import './Footer.css'; // Asegúrate de crear este archivo para estilos específicos del footer

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Party Management App. Todos los derechos reservados.</p>
                <nav>
                    <ul>
                        <li><a href="/about">Acerca de</a></li>
                        <li><a href="/contact">Contacto</a></li>
                        <li><a href="/privacy">Política de privacidad</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;