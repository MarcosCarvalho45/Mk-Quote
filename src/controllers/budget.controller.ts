import { Request, Response } from 'express';
import Budget from '../models/Budget';

export const createBudget = async (req: Request, res: Response) => {
  try {
    const { client, services } = req.body;

    const totalPrice = services.reduce((acc: number, s: any) => {
      return acc + (s.service.unitPrice * s.quantity);
    }, 0);

    const newBudget = await Budget.create({
      client,
      services,
      totalPrice
    });

    res.status(201).json(newBudget);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar orçamento' });
  }
};

export const getBudgets = async (_req: Request, res: Response) => {
  const budgets = await Budget.find();
  res.json(budgets);
};
