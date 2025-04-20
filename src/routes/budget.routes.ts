// routes/budget.routes.ts
import { Router } from 'express';
import { createQuote, getQuotes, generatePdf, updateQuote } from '../controllers/budget.controller';

const router = Router();

// Rota para criar uma nova cotação
router.post('/quotes', createQuote);

// Rota para buscar todas as cotações
router.get('/quotes', getQuotes);

// Rota para gerar o PDF de uma cotação
router.get('/quotes/:quoteId/pdf', generatePdf);

// Rota para atualizar uma cotação específica
router.put('/quotes/:quoteId', updateQuote);

export default router;
