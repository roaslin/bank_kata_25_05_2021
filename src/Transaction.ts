export class Transaction {
  amount: number;
  date: Date;
  constructor(amount: number, date: Date) {
    this.amount = amount;
    this.date = date;
  }
}
