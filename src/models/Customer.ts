import mongoose, { Schema } from 'mongoose';

const customerSchema = new Schema({
  fullName: { type: String, required: true },  // Nome completo ou razão social
  cpfCnpj: { type: String, required: true },  // CPF ou CNPJ
  email: { type: String, required: true, unique: true },  // E-mail
  phone: { type: String, required: true },  // Telefone
  address: { type: String },  // Endereço (opcional)
}, { timestamps: true });

export const Customer = mongoose.model('Customer', customerSchema);
