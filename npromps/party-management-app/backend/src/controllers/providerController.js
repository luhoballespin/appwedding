const Provider = require('../models/Provider');

// Crear un nuevo proveedor
exports.createProvider = async (req, res) => {
    try {
        const { name, description, price, category, images } = req.body;
        const newProvider = new Provider({ name, description, price, category, images });
        await newProvider.save();
        res.status(201).json(newProvider);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el proveedor', error });
    }
};

// Obtener todos los proveedores
exports.getProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proveedores', error });
    }
};

// Obtener un proveedor por ID
exports.getProviderById = async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        if (!provider) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.status(200).json(provider);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el proveedor', error });
    }
};

// Actualizar un proveedor
exports.updateProvider = async (req, res) => {
    try {
        const { name, description, price, category, images } = req.body;
        const updatedProvider = await Provider.findByIdAndUpdate(req.params.id, { name, description, price, category, images }, { new: true });
        if (!updatedProvider) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.status(200).json(updatedProvider);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el proveedor', error });
    }
};

// Eliminar un proveedor
exports.deleteProvider = async (req, res) => {
    try {
        const deletedProvider = await Provider.findByIdAndDelete(req.params.id);
        if (!deletedProvider) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.status(200).json({ message: 'Proveedor eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el proveedor', error });
    }
};