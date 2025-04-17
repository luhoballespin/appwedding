const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Rutas para proveedores
router.post('/', authMiddleware.verifyToken, roleMiddleware.isProvider, providerController.createProvider);
router.get('/', providerController.getAllProviders);
router.get('/:id', providerController.getProviderById);
router.put('/:id', authMiddleware.verifyToken, roleMiddleware.isProvider, providerController.updateProvider);
router.delete('/:id', authMiddleware.verifyToken, roleMiddleware.isProvider, providerController.deleteProvider);
router.get('/:id/requests', authMiddleware.verifyToken, roleMiddleware.isProvider, providerController.getRequests);

module.exports = router;