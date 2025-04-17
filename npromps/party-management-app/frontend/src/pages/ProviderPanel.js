import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getProviders, createService } from '../services/api';
import ProviderCard from '../components/ProviderCard';

const ProviderPanel = () => {
    const { user } = useContext(AuthContext);
    const [providers, setProviders] = useState([]);
    const [serviceData, setServiceData] = useState({
        name: '',
        description: '',
        price: '',
        category: ''
    });

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response.data);
        };
        fetchProviders();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createService(serviceData);
        setServiceData({ name: '', description: '', price: '', category: '' });
        // Optionally refresh the provider list or show a success message
    };

    return (
        <div>
            <h1>Panel de Proveedor</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del servicio"
                    value={serviceData.name}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Descripción del servicio"
                    value={serviceData.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={serviceData.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Categoría"
                    value={serviceData.category}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Agregar Servicio</button>
            </form>
            <h2>Proveedores Destacados</h2>
            <div>
                {providers.map(provider => (
                    <ProviderCard key={provider._id} provider={provider} />
                ))}
            </div>
        </div>
    );
};

export default ProviderPanel;