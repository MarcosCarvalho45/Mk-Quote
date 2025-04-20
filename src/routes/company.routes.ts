// routes/company.routes.ts
import { Router } from 'express';
import { createCompany, getCompanies, updateCompany } from '../controllers/company.controller';

const router = Router();

// Rota para criar uma nova empresa
router.post('/companies', createCompany);

// Rota para obter todas as empresas cadastradas
router.get('/companies', getCompanies);

// Rota para atualizar uma empresa específica
router.put('/companies/:companyId', updateCompany);

export default router;
