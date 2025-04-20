import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './config/database'; // ajuste o caminho se estiver em outro diretório

import clienteRoutes from './routes/client.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o banco
connect();

// Rotas
app.use('/api', clienteRoutes);

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
