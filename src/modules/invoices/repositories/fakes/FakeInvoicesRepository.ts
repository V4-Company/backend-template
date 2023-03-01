import { v4 } from 'uuid';

import { AppError } from '@shared/errors/AppError';
import { ICreateMongoInvoiceDTO } from '@modules/invoices/dtos/ICreateMongoInvoiceDTO';
import { IInvoice } from '../../infra/mongoose/schemas/invoice';
import { IInvoiceRepository } from '../IInvoiceRepository';

export default class InvoiceRepository implements IInvoiceRepository {
  private invoices: IInvoice[] = [];

  public async save(invoice: ICreateMongoInvoiceDTO): Promise<IInvoice> {
    try {
      const invoiceId = v4();

      const createdInvoice: IInvoice = {
        ...invoice,
        _id: invoiceId,
      } as IInvoice;

      this.invoices.push(createdInvoice);

      return createdInvoice;
    } catch (e) {
      throw new AppError('Failed to create database invoice.', 500);
    }
  }

  public async findById(id: string): Promise<IInvoice | undefined> {
    try {
      const invoice = this.invoices.find(item => item._id === id);

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
      const oldInvoiceIndex = this.invoices.findIndex(item => item._id === id);
      const oldInvoice = this.invoices[0];

      if (oldInvoiceIndex === -1) {
        return undefined;
      }

      const newInvoice = { ...oldInvoice, ...invoice } as IInvoice;

      this.invoices[oldInvoiceIndex] = newInvoice;

      return this.invoices[oldInvoiceIndex];
    } catch (e) {
      throw new AppError('Failed to update invoice.', 500);
    }
  }
}
