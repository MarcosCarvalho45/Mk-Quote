import { Request, Response } from 'express';
import { Customer } from '../models/Customer';

// Criar um novo cliente
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { fullName, cpfCnpj, email, phone, address } = req.body;
    const newCustomer = new Customer({ fullName, cpfCnpj, email, phone, address });
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar cliente', error: err });
  }
};

// Buscar todos os clientes
export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar clientes', error: err });
  }
};

// Atualizar um cliente
export const updateCustomer = async (req: Request, res: Response): Promise<any> => {
  const { customerId } = req.params;
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar cliente', error: err });
  }
};

// Deletar um cliente
export const deleteCustomer = async (req: Request, res: Response): Promise<any>  => {
  const { customerId } = req.params;
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(200).json({ message: 'Cliente deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar cliente', error: err });
  }
};
