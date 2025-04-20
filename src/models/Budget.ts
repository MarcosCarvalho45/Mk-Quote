import { Schema, model, Document } from 'mongoose';
import { IClient } from './Client'; // Importando o modelo de Cliente

// Interface que representa um orçamento
export interface IQuote extends Document {
  client: IClient['_id']; // Referência ao cliente
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  totalAmount: number;
  status: string; // Pode ser 'pending', 'approved', 'rejected'
  createdAt: Date;
  updatedAt: Date;
}

// Esquema para o orçamento
const quoteSchema = new Schema<IQuote>({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  items: [{
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    total: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, {
  timestamps: true, // Adiciona `createdAt` e `updatedAt`
});

// Modelo do orçamento
const Quote = model<IQuote>('Quote', quoteSchema);

export default Quote;
