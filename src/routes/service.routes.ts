import { Router } from 'express';
import { createService, getServices,deleteService, updateService } from '../controllers/service.controller';

const router = Router();

router.post('/services', createService);
router.get('/services', getServices);
router.delete('/services/:id', deleteService);
router.put('/services/:id', updateService);

export default router;
