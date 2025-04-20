import { Router } from 'express';
import { createQuote, getQuotes } from '../controllers/budget.controller';

const router = Router();

router.post('/quotes', createQuote);
router.get('/quotes', getQuotes);

export default router;
