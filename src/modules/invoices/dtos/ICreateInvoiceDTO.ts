export interface ICreateInvoiceDTO {
  dueDate: Date;
  status: 'paid' | 'pending';
  price: number;
}
