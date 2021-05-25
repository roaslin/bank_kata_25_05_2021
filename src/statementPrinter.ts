import { CustomConsole } from './customConsole';
import { Transaction } from './Transaction';

export class StatementPrinter {
  constructor(private myConsole: CustomConsole) {}

  printAllStatements(transactions: Transaction[]) {
    this.myConsole.printLn('Date || Amount || Balance');

    transactions.sort((a: Transaction, b: Transaction): number => {
      return a.date.getTime() - b.date.getTime();
    });

    let totalAmount = 0;

    const statements: string[] = [];

    transactions.forEach((transaction) => {
      totalAmount += transaction.amount;
      statements.push(
        `${transaction.date.toLocaleDateString('en-GB')} || ${
          transaction.amount
        } || ${totalAmount}`
      );
    });

    statements
      .reverse()
      .forEach((statement) => this.myConsole.printLn(statement));
  }
}
