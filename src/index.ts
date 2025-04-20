import express from 'express';
import clientRoutes from './routes/client.routes';
import serviceRoutes from './routes/service.routes';
import budgetRoutes from './routes/budget.routes';

const app = express();

app.use('/api/clients', clientRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/budgets', budgetRoutes);
