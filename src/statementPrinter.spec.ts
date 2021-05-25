import { CustomConsole } from './customConsole';
import { StatementPrinter } from './statementPrinter';
import { Transaction } from './Transaction';

jest.mock('./customConsole.ts');

describe('StatementPrinter should', () => {
  test('print headers', () => {
    const myConsole = new CustomConsole();
    const statementPrinter = new StatementPrinter(myConsole);

    statementPrinter.printAllStatements([]);

    expect(myConsole.printLn).toHaveBeenCalledWith('Date || Amount || Balance');
  });

  test('print transactions after headers', () => {
    const myConsole = new CustomConsole();
    const statementPrinter = new StatementPrinter(myConsole);
    const transactionOne = new Transaction(-500, new Date(2019, 0, 1));
    const transactionTwo = new Transaction(1000, new Date(2018, 11, 10));
    const transactionThree = new Transaction(3000, new Date(2017, 8, 1));
    
    statementPrinter.printAllStatements([
      transactionOne,
      transactionTwo,
      transactionThree,
    ]);

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
