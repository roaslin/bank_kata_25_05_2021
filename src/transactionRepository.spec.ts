import { Clock } from './Clock';
import { Transaction } from './Transaction';
import { TransactionRepository } from './TransactionRepository';

describe('TransactionRepository should', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('add a deposit transaction', () => {
    const clock = new Clock();
    const today = new Date();
    const repository = new TransactionRepository(clock);
    const expectedTransaction = new Transaction(100, today);
    clock.today = jest.fn().mockImplementation(() => {
      return today;
    });

    repository.addDeposit(100);

    expect(repository.getAllTransactions()[0]).toEqual(expectedTransaction);
  });

  test('add a withdraw transaction', () => {
    const clock = new Clock();
    const today = new Date();
    const repository = new TransactionRepository(clock);
    const expectedTransaction = new Transaction(-200, today);
    clock.today = jest.fn().mockImplementation(() => {
      return today;
    });

    repository.addWithdraw(200);

    expect(repository.getAllTransactions()[0]).toEqual(expectedTransaction);
  });
});
