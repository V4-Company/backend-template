import { IMailProvider } from '../models/IMailProvider';

class NodeMailerProvider implements IMailProvider {
  public async sendMail(): Promise<{ message: string }> {
    return { message: 'Fake Email example!' };
  }
}

export default NodeMailerProvider;
