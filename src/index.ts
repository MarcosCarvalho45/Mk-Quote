import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './config/database'; // ajuste o caminho se estiver em outro diretório

import customerRoutes from './routes/customer.routes'; // Rota de clientes
import budgetRoutes from './routes/budget.routes';
import serviceRoutes from './routes/service.routes';
import companyRoutes from './routes/company.routes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o banco
connect();

// Rotas
app.use('/api', customerRoutes); 
app.use('/api', budgetRoutes);
app.use('/api', serviceRoutes);
app.use('/api', companyRoutes);

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
