import mongoose, { Schema } from 'mongoose';

const serviceSchema = new Schema({
  title: { type: String, required: true }, // Nome ou título do serviço
  description: { type: String, required: true }, // Descrição detalhada
  duration: { type: String }, // Quantidade de horas ou dias (ex: "2 dias", "5 horas")
  materialsIncluded: { type: String }, // Materiais inclusos
  materialsNotIncluded: { type: String }, // Materiais não inclusos
  executionStart: { type: Date }, // Data de início da execução
  executionEnd: { type: Date }, // Data de término da execução
  warranty: { type: String }, // Garantia oferecida (ex: "3 meses")
  price: { type: Number, required: true }, // Valor
  createdAt: { type: Date, default: Date.now },
});

export const Service = mongoose.model('Service', serviceSchema);
