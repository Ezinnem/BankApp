/* eslint-disable space-before-blocks */
const moment = require('moment');
const uuid = require('uuid');


class UserAccount {
  constructor() {
    this.userAccounts = [];
  }

  create(data){
    const newUserAccount = {
      id: uuid.v4(),
      fullName: data.fullName || '',
      userEmail: data.userEmail || '',
      password: data.password || '',
      nuban: data.nuban || '',
      Balance: data.Balance || '',
      accountType: data.accountType || '',
      createdDate: moment.now(),
      modifiedDate: moment.not(),
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
    this.userAccounts[index].fullName = data.fullName || userAccount.fullName;
    this.userAccounts[index].userEmail = data.userEmail || userAccount.userEmail;
    this.userAccounts[index].password = data.password || userAccount.password;
    this.userAccounts[index].nuban = data.nuban || userAccount.nuban;
    this.userAccounts[index].Balance = data.Balance || userAccount.Balance;
    this.userAccounts[index].modifiedDate = moment.now();
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
