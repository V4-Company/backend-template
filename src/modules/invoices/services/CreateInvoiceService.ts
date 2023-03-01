import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { ICreateInvoiceDTO } from '../dtos/ICreateInvoiceDTO';
import { IInvoiceRepository } from '../repositories/IInvoiceRepository';
import { ICreateMongoInvoiceDTO } from '../dtos/ICreateMongoInvoiceDTO';

interface IResponse {
  invoiceId: string;
  status: string;
  descricao: string;
}

@injectable()
class CreateInvoiceService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('InvoiceRepository')
    private invoiceRepository: IInvoiceRepository,
  ) {}

  public async execute(data: ICreateInvoiceDTO): Promise<IResponse> {
    const invoice: ICreateMongoInvoiceDTO = {
      dueDate: data.dueDate,
      price: data.price,
      status: data.status,
    };

    if (data.dueDate < new Date()) {
      throw new AppError('You cannot create a invoice in the past');
    }

    const mongoInvoice = await this.invoiceRepository.save(invoice);

    await this.mailProvider.sendMail({
      content: 'New invoice created!',
      target: 'email@example.com',
    });

    const invoiceStatus = {
      invoiceId: mongoInvoice._id.toString(),
      status: 'Sucesso',
      descricao: `${mongoInvoice._id}, sucessfully created`,
    };

    return invoiceStatus;
  }
}

export default CreateInvoiceService;
