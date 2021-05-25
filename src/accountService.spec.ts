import { AccountService } from './accountService';
import { Clock } from './Clock';
import { CustomConsole } from './customConsole';
import { StatementPrinter } from './statementPrinter';
import { Transaction } from './Transaction';
import { TransactionRepository } from './TransactionRepository';

jest.mock('./TransactionRepository');
jest.mock('./statementPrinter');
jest.mock('./customConsole');

describe('AccountService should', () => {
  let clock: Clock;
  let repository: TransactionRepository;
  let statementPrinter: StatementPrinter;
  let service: AccountService;
  let myConsole: CustomConsole;

  beforeEach(() => {
    jest.resetAllMocks();
    clock = new Clock();
    repository = new TransactionRepository(clock);
    statementPrinter = new StatementPrinter(myConsole);
    service = new AccountService(repository, statementPrinter);
  });
  test('deposit an amount', () => {
    service.deposit(100);

    expect(repository.addDeposit).toHaveBeenCalledWith(100);
  });

  test('withdraw an amount', () => {
    service.withdraw(100);

    expect(repository.addWithdraw).toHaveBeenCalledWith(100);
  });

  test('print statements', () => {
    const today = new Date();
    const transactionOne = new Transaction(100, today);
    const transactionTwo = new Transaction(-200, today);
    const transactions = [transactionOne, transactionTwo];
    repository.getAllTransactions = jest.fn().mockReturnValue(transactions);

    service.printStatements();

    expect(statementPrinter.printAllStatements).toHaveBeenCalledWith(
      transactions
    );
  });
});
