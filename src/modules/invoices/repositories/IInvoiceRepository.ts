import { ICreateMongoInvoiceDTO } from '../dtos/ICreateMongoInvoiceDTO';
import { IInvoice } from '../infra/mongoose/schemas/invoice';

export interface IInvoiceRepository {
  save(invoice: ICreateMongoInvoiceDTO): Promise<IInvoice>;
  findById(id: string): Promise<IInvoice | undefined>;
  update(id: string, invoice: IInvoice): Promise<IInvoice | undefined>;
}
