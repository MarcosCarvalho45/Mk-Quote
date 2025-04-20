import { Router } from 'express';
import { createBudget, getBudgets } from '../controllers/budget.controller';

const router = Router();

router.post('/', createBudget);
router.get('/', getBudgets);

export default router;
