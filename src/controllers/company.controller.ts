// controllers/company.controller.ts
import { Request, Response } from 'express';
import { Company } from '../models/Company';

// Função para criar uma nova empresa
export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, cnpjOrCpf, address, phoneOrWhatsapp, email, logo } = req.body;

    const newCompany = new Company({
      name,
      cnpjOrCpf,
      address,
      phoneOrWhatsapp,
      email,
      logo,
    });

    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar empresa', error: err });
  }
};

// Função para buscar todas as empresas
export const getCompanies = async (_req: Request, res: Response) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar empresas', error: err });
  }
};

// Função para atualizar uma empresa existente
export const updateCompany = async (req: Request, res: Response): Promise<any> => {
  const { companyId } = req.params;
  const { name, cnpjOrCpf, address, phoneOrWhatsapp, email, logo } = req.body;

  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { name, cnpjOrCpf, address, phoneOrWhatsapp, email, logo },
      { new: true } // Retorna a empresa atualizada
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }

    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar empresa', error: err });
  }
};