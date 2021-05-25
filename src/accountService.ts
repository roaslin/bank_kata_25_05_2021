
import { StatementPrinter } from './statementPrinter';
import { TransactionRepository } from './TransactionRepository';

export class AccountService {
  constructor(
    private repository: TransactionRepository,
    private statementPrinter: StatementPrinter
  ) {}

  deposit(amount: number) {
    this.repository.addDeposit(amount);
  }
  withdraw(amount: number) {
    this.repository.addWithdraw(amount);
  }
  printStatements() {
    this.statementPrinter.printAllStatements(
      this.repository.getAllTransactions()
    );
  }
}
