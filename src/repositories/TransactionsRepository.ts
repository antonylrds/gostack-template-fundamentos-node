import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    if (this.transactions.length > 0) {
      const incomes = this.transactions.map(transaction => {
        if (transaction.type === 'income') {
          return transaction.value;
        }
        return 0.0;
      });

      const outcomes = this.transactions.map(transaction => {
        if (transaction.type === 'outcome') {
          return transaction.value;
        }
        return 0.0;
      });

      income = incomes.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
      );

      outcome = outcomes.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
      );
    }

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
