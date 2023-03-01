import { AppError } from '@shared/errors/AppError';

import { IInvoiceRepository } from '@modules/invoices/repositories/IInvoiceRepository';
import { ICreateMongoInvoiceDTO } from '@modules/invoices/dtos/ICreateMongoInvoiceDTO';

import Invoice, { IInvoice } from '../schemas/invoice';

export default class InvoiceRepository implements IInvoiceRepository {
  public async save(invoice: ICreateMongoInvoiceDTO): Promise<IInvoice> {
    try {
      const createdInvoice = await Invoice.create(invoice);
      return createdInvoice;
    } catch (e) {
      throw new AppError('Failed to create database invoice.', 500);
    }
  }

  public async findById(id: string): Promise<IInvoice | undefined> {
    try {
      const invoice = await Invoice.findById(id);

      if (!invoice) {
        return undefined;
      }

      return invoice;
    } catch (e) {
      throw new AppError('Failed to find invoice.', 500);
    }
  }

  public async update(
    id: string,
    invoice: IInvoice,
  ): Promise<IInvoice | undefined> {
    try {
      const updatedInvoice = await Invoice.findByIdAndUpdate(id, invoice, {
        new: true,
      });

      if (!updatedInvoice) {
        return undefined;
      }

      return updatedInvoice;
    } catch (e) {
      throw new AppError('Failed to update invoice.', 500);
    }
  }
}
