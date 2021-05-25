import { Clock } from './Clock';
import { Transaction } from './Transaction';

export class TransactionRepository {
  values: Transaction[] = [];
  clock: Clock;

  constructor(clock: Clock) {
    this.clock = clock;
  }

  getAllTransactions(): Transaction[] {
    return this.values.slice();
  }
  addDeposit(amount: number) {
    const newDeposit = new Transaction(amount, this.clock.today());
    this.values.push(newDeposit);
  }
  addWithdraw(amount: number) {
    const newWithdraw = new Transaction(-amount, this.clock.today());
    this.values.push(newWithdraw);
  }
}
