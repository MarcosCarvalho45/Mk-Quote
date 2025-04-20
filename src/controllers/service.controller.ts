import { Request, Response } from 'express';
import { Service } from '../models/Service';

export const createService = async (req: Request, res: Response) => {
  try {
    const service = new Service(req.body);
    const saved = await service.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar serviço', error: err });
  }
};

export const getServices = async (_req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar serviços', error: err });
  }
};

export const updateService = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    try {
      const updated = await Service.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Serviço não encontrado' });
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar serviço', error: err });
    }
  };

  export const deleteService = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    try {
      const deleted = await Service.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Serviço não encontrado' });
      res.status(200).json({ message: 'Serviço removido com sucesso' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao deletar serviço', error: err });
    }
  };