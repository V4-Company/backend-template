import { Types, Schema, Document, model } from 'mongoose';

export interface IInvoice extends Document {
  _id: Types.ObjectId | string;
  price: number;
  dueDate: Date;
  status: string;
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    price: Number,
    dueDate: Date,
  },
  { timestamps: true },
);

const invoiceModel = model<IInvoice>('Invoice', InvoiceSchema);

export default invoiceModel;
