import mongoose, { Schema } from 'mongoose';

const quoteSchema = new Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String },
  clientPhone: { type: String },
  serviceDescription: { type: String, required: true },
  estimatedTime: { type: String },
  total: { type: Number, required: true },
  paymentConditions: { type: String },
  validity: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Quote = mongoose.model('Quote', quoteSchema);
