import express from 'express';
import quoteRoutes from './routes/budget.routes';

const app = express();

// Middleware para permitir o uso de JSON nas requisições
app.use(express.json());

// Definindo as rotas
app.use('/api/quotes', quoteRoutes);

// Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
