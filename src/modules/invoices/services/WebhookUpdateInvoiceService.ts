// Webhook update example
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IInvoiceRepository } from '../repositories/IInvoiceRepository';

interface IRequest {
  data: {
    id: string;
    status: 'paid' | 'pending' | 'canceled' | 'expired';
  };
}

interface IResponse {
  message: string;
}

@injectable()
class WebhookUpdateInvoiceService {
  constructor(
    @inject('InvoiceRepository')
    private invoiceRepository: IInvoiceRepository,
  ) {}

  public async execute(body: IRequest): Promise<IResponse> {
    const { id, status } = body.data;

    const invoice = await this.invoiceRepository.findById(id);

    if (!invoice) {
      throw new AppError('Invoice not found');
    }

    invoice.status = status;

    await this.invoiceRepository.update(invoice._id.toString(), invoice);

    return { message: 'Ok' };
  }
}

export default WebhookUpdateInvoiceService;
