/* eslint-disable space-before-blocks */
const moment = require('moment');
const uuid = require('uuid');


class UserAccount {
  constructor() {
    this.userAccounts = [{
      id: 1,
      accountNumber: 1001001001,
      createdOn: new Date(),
      owner: 1,
      type: 'Savings',
      status: 'Active',
      balance: 120000.56,
    },
    {
      id: 2,
      accountNumber: 1001001002,
      createdOn: new Date(),
      owner: 2,
      type: 'Current',
      status: 'Dormant',
      balance: 200056.00,
    },
    ];
  }

  create(data){
    const newUserAccount = {
      id: this.userAccounts.length + 1,
      accountNumber: data.accountNumber || '',
      createdOn: data.createdOn || '',
      owner: data.owner || '',
      type: data.type || '',
      status: data.status || '',
      balance: data.balance || '',
    };
    this.userAccounts.push(newUserAccount);
    return newUserAccount;
  }

  findOne(id){
    return this.userAccounts.find((account) => account.id === id);
  }

  findAll() {
    return this.userAccounts;
  }

  update(id, data) {
    const userAccount = this.findOne(id);
    const index = this.userAccounts.indexOf(userAccount);
    this.userAccounts[index].id = data.id || userAccount.id;
    this.userAccounts[index].accountNumber = data.accountNumber || userAccount.accountNumber;
    this.userAccounts[index].createdOn = data.createdOn || userAccount.createdOn;
    this.userAccounts[index].owner = data.owner || userAccount.owner;
    this.userAccounts[index].type = data.type || userAccount.type;
    this.userAccounts[index].status = data.status || userAccount.status;
    this.userAccounts[index].balance = data.balance || userAccount.balance;
    this.userAccounts[index].modifiedDate = new Date();
    return this.userAccounts[index];
  }

  delete(id) {
    const userAccount = this.findOne(id);
    const index = this.userAccounts.indexOf(userAccount);
    this.userAccounts.splice(index, 1);
    return {};
  }
}
module.exports = UserAccount;
