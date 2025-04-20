import { Router } from 'express';
import { createCustomer, getCustomers, updateCustomer, deleteCustomer } from '../controllers/customer.controller';

const router = Router();

// Rota para criar um cliente
router.post('/customers', createCustomer);

// Rota para buscar todos os clientes
router.get('/customers', getCustomers);

// Rota para atualizar um cliente
router.put('/customers/:customerId', updateCustomer);

// Rota para deletar um cliente
router.delete('/customers/:customerId', deleteCustomer);

export default router;
