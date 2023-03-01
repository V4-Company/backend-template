import { container } from 'tsyringe';

import InvoiceRepository from '@modules/invoices/infra/mongoose/repository/invoiceRepository';
import { IInvoiceRepository } from '@modules/invoices/repositories/IInvoiceRepository';

import './providers';

container.registerSingleton<IInvoiceRepository>(
  'InvoiceRepository',
  InvoiceRepository,
);
