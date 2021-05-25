import { AccountService } from './accountService';
import { Clock } from './Clock';
import { CustomConsole } from './customConsole';
import { StatementPrinter } from './statementPrinter';
import { TransactionRepository } from './TransactionRepository';

jest.mock('./Clock');
jest.mock('./customConsole');

describe('Print statements feature', () => {
  let myConsole: CustomConsole;
  let clock: Clock;
  let transactionRepository: TransactionRepository;
  let statementPrinter: StatementPrinter;
  let accountService: AccountService;

  beforeEach(() => {
    jest.resetAllMocks();
    const myConsole = new CustomConsole();
    const clock = new Clock();
    const transactionRepository = new TransactionRepository(clock);
    const statementPrinter = new StatementPrinter(myConsole);
    const accountService = new AccountService(
      transactionRepository,
      statementPrinter
    );
  });
  
  test('prints bank account statements in order', () => {
    clock.today = jest
      .fn()
      .mockImplementationOnce(() => new Date(2017, 8, 1))
      .mockImplementationOnce(() => new Date(2018, 11, 10))
      .mockImplementationOnce(() => new Date(2019, 0, 1));

    accountService.deposit(3000);
    accountService.deposit(1000);
    accountService.withdraw(500);

    accountService.printStatements();

    expect(myConsole.printLn).toHaveBeenNthCalledWith(
      1,
      'Date || Amount || Balance'
    );
    expect(myConsole.printLn).toHaveBeenNthCalledWith(
      2,
      '01/01/2019 || -500 || 3500'
    );
    expect(myConsole.printLn).toHaveBeenNthCalledWith(
      3,
      '10/12/2018 || 1000 || 4000'
    );
    expect(myConsole.printLn).toHaveBeenNthCalledWith(
      4,
      '01/09/2017 || 3000 || 3000'
    );
  });
});
