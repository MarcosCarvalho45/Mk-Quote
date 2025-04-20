// models/Budget.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Quote extends Document {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceDescription: string;
  estimatedTime: string;
  items: { serviceName: string, unitPrice: number, quantity: number }[]; // Valor por item (com nome, preço e quantidade)
  subtotal: number; // Subtotal (sem descontos)
  discount: number; // Desconto aplicado
  total: number; // Valor total após descontos
  paymentMethods: string[]; // Métodos de pagamento (ex: PIX, Boleto, Cartão, etc.)
  paymentConditions: string; // Condições de pagamento (ex: 50% na aprovação)
  status: string; // Status da cotação
  createdAt: Date;
}

// Definir o esquema de dados da empresa
const companySchema = new Schema({
  name: { type: String, required: true },
  cnpj: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const quoteSchema: Schema = new Schema(
  {
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String, required: true },
    serviceDescription: { type: String, required: true },
    estimatedTime: { type: String },
    items: [
      {
        serviceName: { type: String, required: true },
        unitPrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
      }
    ], // Valor por item
    subtotal: { type: Number, required: true }, // Subtotal
    discount: { type: Number, default: 0 }, // Desconto aplicado
    total: { type: Number, required: true }, // Total
    paymentMethods: { type: [String], required: true }, // Formas de pagamento
    paymentConditions: { type: String, required: true }, // Condições de pagamento
    company: companySchema,  // Adicionando os dados da empresa
    status: { type: String, default: 'Em andamento' }, // Status da cotação
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);


export const Quote = mongoose.model('Quote', quoteSchema);
