/* eslint-disable space-before-blocks */
const moment = require('moment');
const uuid = require('uuid');

class UserTransaction {
  constructor() {
    this.userTransactions = [];
  }

  create(data) {
    const newUserTransaction = {
      id: uuid.v4,
      createdOn: moment.now(),
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
    return this.userTransactions.find((transaction) => transaction.id == id);
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
module.exports = new UserTransaction();
