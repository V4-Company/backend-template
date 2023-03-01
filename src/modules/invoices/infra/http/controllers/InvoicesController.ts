import WebhookUpdateInvoiceService from '@modules/invoices/services/WebhookUpdateInvoiceService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateInvoiceService from '../../../services/CreateInvoiceService';

export default class InvoicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createInvoice = container.resolve(CreateInvoiceService);

    const invoice = await createInvoice.execute(request.body);

    return response.json(invoice);
  }

  public async webhook(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateInvoice = container.resolve(WebhookUpdateInvoiceService);

    const invoice = await updateInvoice.execute(request.body);

    return response.json(invoice);
  }
}
