import { Schema, model, Document } from 'mongoose';

// Interface que representa um cliente
export interface IClient extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  company?: string; // Opcional
  createdAt: Date;
  updatedAt: Date;
}

// Esquema para o cliente
const clientSchema = new Schema<IClient>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  company: { type: String },
}, {
  timestamps: true, // Adiciona `createdAt` e `updatedAt`
});

// Modelo do cliente
const Client = model<IClient>('Client', clientSchema);

export default Client;
