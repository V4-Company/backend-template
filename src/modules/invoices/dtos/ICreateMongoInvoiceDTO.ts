export interface ICreateMongoInvoiceDTO {
  price: number;
  dueDate: Date;
  status?: string;
}
