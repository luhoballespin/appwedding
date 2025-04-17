import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProviderCard from '../components/ProviderCard';

const Home = () => {
    const providers = [
        { id: 1, name: 'DJ Juan', category: 'DJ', price: '$500', image: 'path/to/image1.jpg' },
        { id: 2, name: 'Bebidas XYZ', category: 'Bebidas', price: '$300', image: 'path/to/image2.jpg' },
        { id: 3, name: 'Decoraciones Elegantes', category: 'Decoración', price: '$700', image: 'path/to/image3.jpg' },
    ];

    return (
        <div>
            <Header />
            <main>
                <h1>Bienvenido a la Plataforma de Organización de Fiestas</h1>
                <p>Organiza tus eventos de manera fácil y eficiente con nuestra plataforma. Encuentra proveedores, gestiona tus invitados y mucho más.</p>
                
                <h2>Proveedores Destacados</h2>
                <div className="provider-list">
                    {providers.map(provider => (
                        <ProviderCard key={provider.id} provider={provider} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;