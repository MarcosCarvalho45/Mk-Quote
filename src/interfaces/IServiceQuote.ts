export interface IServiceQuote {
    clientName: string;
    clientEmail?: string;
    clientPhone?: string;
    serviceDescription: string;
    estimatedTime?: string;
    total: number;
    paymentConditions?: string;
    validity?: string;
    createdAt: Date;
  }
  