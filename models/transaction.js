/* eslint-disable space-before-blocks */
const moment = require('moment');
const uuid = require('uuid');

class UserTransaction {
  constructor() {
    this.userTransactions = [{
      id: 1,
      createdOn: new Date(),
      type: 'Savings',
      accountNumber: 1001001001,
      cashier: 1,
      amount: 10000,
      oldBalance: 120000.58,
      NewBalance: 130000.58,
    },
    {
      id: 2,
      createdOn: new Date(),
      type: 'Savings',
      accountNumber: 1001001002,
      cashier: 1,
      amount: 10000,
      oldBalance: 30000.58,
      NewBalance: 40000.58,
    },

    ];
  }

  create(data) {
    const newUserTransaction = {
      id: this.userTransactions.length + 1,
      createdOn: data.createdOn || '',
      type: data.type || '',
      accountNumber: data.accountNumber || '',
      cashier: data.cashier || '',
      amount: data.amount || '',
      oldBalance: data.oldBalance || '',
      newBalance: data.newBalance || '',
    };
    this.userTransactions.push(newUserTransaction);
    return newUserTransaction;
  }

  findOne(id) {
    return this.userTransactions.find((transaction) => transaction.id === id);
  }

  findAll() {
    return this.userTransactions;
  }

  delete(id) {
    const userTransaction = this.findOne(id);
    const index = this.userTransactions.indexOf(userTransaction);
    this.userTransactions.splice(index, 1);
    return {};
  }
}
module.exports = UserTransaction;
