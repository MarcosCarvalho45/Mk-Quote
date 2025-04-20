import { Request, Response } from 'express';
import Service from '../models/Service';

export const createService = async (req: Request, res: Response) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar serviço' });
  }
};

export const getServices = async (_req: Request, res: Response) => {
  const services = await Service.find();
  res.json(services);
};
