export interface IMailProvider {
  sendMail(email: {
    target: string;
    content: string;
  }): Promise<{ message: string }>;
}
