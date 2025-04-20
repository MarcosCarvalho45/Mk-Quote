import mongoose, { Schema, Document } from 'mongoose';

interface ICompany extends Document {
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  email: string;
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  cnpj: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const Company = mongoose.model<ICompany>('Company', companySchema);

export { Company };
