import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { providerService } from '../services/api';
import ProviderCard from '../components/ProviderCard';
import toast from 'react-hot-toast';

const ProviderPanel = () => {
    const { isAuthenticated } = useAuth();
    const [providers, setProviders] = useState([]);
    // const [loading, setLoading] = useState(true); // Para uso futuro
    const [serviceData, setServiceData] = useState({
        name: '',
        description: '',
        price: '',
        category: ''
    });

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await providerService.getProviders();
                if (response.success) {
                    setProviders(response.data);
                }
            } catch (error) {
                toast.error('Error al cargar proveedores');
            }
        };
        fetchProviders();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await providerService.createProvider(serviceData);
            if (response.success) {
                toast.success('Servicio creado exitosamente');
                setServiceData({ name: '', description: '', price: '', category: '' });
                // Recargar la lista de proveedores
                const updatedResponse = await providerService.getProviders();
                if (updatedResponse.success) {
                    setProviders(updatedResponse.data);
                }
            }
        } catch (error) {
            toast.error('Error al crear servicio');
            console.error('Error creating service:', error);
        }
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