import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import { IMailProvider } from './models/IMailProvider';

import IuguPaymentProvider from './implementations/NodeMailerProvider';
import FakePaymentProvider from './fakes/FakeNodeMailProvider';

const providers = {
  local: container.resolve(FakePaymentProvider),
  nodeMailer: container.resolve(IuguPaymentProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
