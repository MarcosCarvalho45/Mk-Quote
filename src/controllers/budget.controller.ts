import { Request, Response } from 'express';
import { Quote } from '../models/Budget';
import { generateQuotePdf } from '../services/quotePdfService';
import path from 'path';

export const createQuote = async (req: Request, res: Response) => {
  try {
    const { clientName, clientEmail, clientPhone, serviceDescription, estimatedTime, items, discount, paymentMethods, paymentConditions, company } = req.body;

    // Calcular subtotal
    const subtotal = items.reduce((acc: number, item: any) => acc + (item.unitPrice * item.quantity), 0);

    // Calcular total após desconto
    const total = subtotal - (subtotal * (discount / 100));

    const newQuote = new Quote({
      clientName,
      clientEmail,
      clientPhone,
      serviceDescription,
      estimatedTime,
      items,
      subtotal,
      discount,
      total,
      paymentMethods,
      paymentConditions,
      company
    });

    const savedQuote = await newQuote.save();
    res.status(201).json(savedQuote);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar cotação', error: err });
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

export const generatePdf = async (req: Request, res: Response): Promise<any> => {
  const { quoteId } = req.params;

  try {
    const quote = await Quote.findById(quoteId);

    if (!quote) {
      return res.status(404).json({ message: 'Orçamento não encontrado' });
    }

    // Gerar o PDF
    const filePath = generateQuotePdf(quote);

    // Enviar o arquivo PDF como resposta
    const fileName = path.basename(filePath);
    res.download(filePath, fileName, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao enviar PDF', error: err });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao gerar PDF', error: err });
  }
};

// Atualizar uma cotação existente
export const updateQuote = async (req: Request, res: Response): Promise<any> => {
  const { quoteId } = req.params;
  const { clientName, clientEmail, clientPhone, serviceDescription, estimatedTime, items, discount, paymentMethods, paymentConditions , company} = req.body;

  // Calcular subtotal
  const subtotal = items.reduce((acc: number, item: any) => acc + (item.unitPrice * item.quantity), 0);

  // Calcular total após desconto
  const total = subtotal - (subtotal * (discount / 100));

  try {
    const updatedQuote = await Quote.findByIdAndUpdate(
      quoteId,
      { clientName, clientEmail, clientPhone, serviceDescription, estimatedTime, items, subtotal, discount, total, paymentMethods, paymentConditions, company },
      { new: true } // Retorna a cotação atualizada
    );

    if (!updatedQuote) {
      return res.status(404).json({ message: 'Cotação não encontrada' });
    }

    res.status(200).json(updatedQuote);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar cotação', error: err });
  }
};