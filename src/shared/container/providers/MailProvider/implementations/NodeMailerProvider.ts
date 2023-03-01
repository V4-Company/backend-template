import { IMailProvider } from '../models/IMailProvider';

class NodeMailerProvider implements IMailProvider {
  public async sendMail(): Promise<{ message: string }> {
    return { message: 'Email example!' };
  }
}

export default NodeMailerProvider;
