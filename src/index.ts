import express from 'express';
import { connectToDatabase } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectToDatabase();

app.get('/', (req, res) => {
  res.send('Mk Quote rodando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
