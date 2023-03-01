import 'reflect-metadata';

import { describe, expect, it, beforeEach } from 'vitest';
import { AppError } from '../../../shared/errors/AppError';

import FakeMailProvider from '../../../shared/container/providers/MailProvider/fakes/FakeNodeMailProvider';
import CreateInvoiceService from './CreateInvoiceService';
import FakeInvoicesRepository from '../repositories/fakes/FakeInvoicesRepository';

let fakeInvoicesRepository: FakeInvoicesRepository;
let fakeMailProvider: FakeMailProvider;
let createInvoice: CreateInvoiceService;

describe('Create invoice tests', () => {
  beforeEach(() => {
    fakeInvoicesRepository = new FakeInvoicesRepository();
    fakeMailProvider = new FakeMailProvider();

    createInvoice = new CreateInvoiceService(
      fakeMailProvider,
      fakeInvoicesRepository,
    );
  });

  it('should be able to create an invoice', async () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const invoice = await createInvoice.execute({
      dueDate: date,
      price: 500,
      status: 'paid',
    });

    const createdInvoice = await fakeInvoicesRepository.findById(
      invoice.invoiceId,
    );

    expect(createdInvoice?._id).toBeDefined();
  });

  it('should not be able to create an invoice with an invalid date', async () => {
    const tryToCreateInvoice = async () => {
      await createInvoice.execute({
        dueDate: new Date(2021, 2, 3),
        price: 500,
        status: 'paid',
      });
    };

    await expect(tryToCreateInvoice()).rejects.toBeInstanceOf(AppError);
  });
});
