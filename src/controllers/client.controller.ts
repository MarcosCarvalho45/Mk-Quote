import { Request, Response } from 'express';
import Client from '../models/Client';

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar cliente' });
  }
};

export const getClients = async (_req: Request, res: Response) => {
  const clients = await Client.find();
  res.json(clients);
};
