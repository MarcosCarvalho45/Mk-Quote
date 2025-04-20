import { Request, Response } from 'express';
import { Quote } from '../models/Budget';

export const createQuote = async (req: Request, res: Response) => {
  try {
    const newQuote = new Quote(req.body);
    const savedQuote = await newQuote.save();
    res.status(201).json(savedQuote);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar orçamento', error: err });
  }
};

export const getQuotes = async (_req: Request, res: Response) => {
  try {
    const quotes = await Quote.find();
    res.status(200).json(quotes);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar orçamentos', error: err });
  }
};
