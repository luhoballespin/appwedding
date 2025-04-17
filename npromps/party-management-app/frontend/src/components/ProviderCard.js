import React from 'react';

const ProviderCard = ({ provider }) => {
    return (
        <div className="provider-card">
            <img src={provider.photo} alt={provider.name} className="provider-photo" />
            <h3 className="provider-name">{provider.name}</h3>
            <p className="provider-category">{provider.category}</p>
            <p className="provider-price">Precio base: ${provider.basePrice}</p>
            <button className="provider-button">Ver más</button>
        </div>
    );
};

export default ProviderCard;