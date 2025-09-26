import express from 'express';
import {
  createProvider,
  getProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
  searchProviders,
  getProviderRequests,
  updateRequestStatus
} from '../controllers/providerController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validation.js';
import { createProviderSchema, updateProviderSchema } from '../validations/providerValidation.js';

const router = express.Router();

// Rutas públicas
router.get('/', getProviders);
router.get('/search', searchProviders);
router.get('/:id', getProviderById);

// Rutas protegidas para proveedores
router.post('/',
  authenticate,
  authorize('proveedor'),
  validate(createProviderSchema),
  createProvider
);

router.put('/:id',
  authenticate,
  authorize('proveedor'),
  validate(updateProviderSchema),
  updateProvider
);

router.delete('/:id',
  authenticate,
  authorize('proveedor'),
  deleteProvider
);

// Rutas específicas para proveedores autenticados
router.get('/my/requests',
  authenticate,
  authorize('proveedor'),
  getProviderRequests
);

router.put('/requests/:requestId',
  authenticate,
  authorize('proveedor'),
  updateRequestStatus
);

export default router;