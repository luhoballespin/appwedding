import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Calendar from '../components/Calendar';
import Note from '../components/Note';
import ProviderCard from '../components/ProviderCard';
import { getProviders } from '../services/api';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const fetchProviders = async () => {
            const data = await getProviders();
            setProviders(data);
        };

        fetchProviders();
    }, []);

    return (
        <div className="dashboard">
            <h1>Bienvenido, {user.name}</h1>
            <Calendar />
            <Note />
            <h2>Proveedores Destacados</h2>
            <div className="provider-list">
                {providers.map(provider => (
                    <ProviderCard key={provider._id} provider={provider} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;