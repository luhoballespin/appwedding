import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Assuming you have a CSS file for styling

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Menú</h2>
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/profile">Perfil</Link>
                </li>
                <li>
                    <Link to="/providers">Proveedores</Link>
                </li>
                <li>
                    <Link to="/events">Eventos</Link>
                </li>
                <li>
                    <Link to="/notes">Notas</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;