/* eslint-disable space-before-blocks */
const moment = require('moment');
const uuid = require('uuid');

class UserTransaction {
  constructor() {
    this.userTransactions = [
      {
        id: 1,
        createdOn: new Date(),
        type: 'Savings',
        accountNumber: 1001001001,
        cashier: 1,
        amount: 10000,
        oldBalance: 120000.58,
        NewBalance: 130000.58
      },
      {
        id: 2,
        createdOn: new Date(),
        type: 'Savings',
        accountNumber: 1001001002,
        cashier: 1,
        amount: 10000,
        oldBalance: 30000.58,
        NewBalance: 40000.58
      }
    ]
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
      newBalance: data.newBalance || ''
    }
    this.userTransactions.push(newUserTransaction)
    return newUserTransaction
  }

  findOne(id) {
    return this.userTransactions.find(
      transaction => transaction.id === Number(id)
    )
  }

  findAll() {
    return this.userTransactions
  }

  update(id, data) {
    const userTransaction = this.findOne(id)
    const index = this.userTransactions.indexOf(userTransaction)
    this.userTransactions[index].id = data.id || userTransaction.id
    this.userTransactions[index].createdOn = data.createdOn || userTransaction.createdOn
    this.userTransactions[index].type = data.type || userTransaction.type
    this.userTransactions[index].accountNumber = data.accountNumber || userTransaction.accountNumber
    this.userTransactions[index].cashier = data.cashier || userTransaction.cashier
    this.userTransactions[index].amount = data.amount || userTransaction.amount
    this.userTransactions[index].oldBalance = data.oldBalance || userTransaction.oldBalance
    this.userTransactions[index].newBalance = data.newBalance || userTransaction.newBalance
    this.userTransactions[index].modifiedDate = new Date()
    return this.userTransactions[index]
  }

  delete(id) {
    const userTransaction = this.findOne(id)
    const index = this.userTransactions.indexOf(userTransaction)
    this.userTransactions.splice(index, 1)
    return {}
  }
}
module.exports = new UserTransaction() ;
