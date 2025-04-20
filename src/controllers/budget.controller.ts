import { Request, Response } from 'express';
import { Quote } from '../models/Budget';

export const createQuote = async (req: Request, res: Response) => {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      serviceDescription,
      estimatedTime,
      total,
      paymentConditions,
      validity
    } = req.body;

    const quote = new Quote({
      clientName,
      clientEmail,
      clientPhone,
      serviceDescription,
      estimatedTime,
      total,
      paymentConditions,
      validity
    });

    await quote.save();

    res.status(201).json(quote);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar orçamento' });
  }
};
