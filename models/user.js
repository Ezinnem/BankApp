/* eslint-disable space-before-blocks */
const moment = require('moment');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'secretkey23456';
const expiresIn = 24 * 60 * 60;
class User {
  constructor() {
    this.users = [{
      token: accessToken,
      id: 1,
      email: 'nnamani.ezinne@gmail.com',
      firstName: 'Ezinne',
      lastName: 'Nnamani',
      password,
      type: 'client',
      isAdmin: 'false',
    },
    {
      token: accessToken,
      id: 2,
      email: 'ify.okeke@gmail.com',
      firstName: 'Ify',
      lastName: 'Okeke',
      password,
      type: 'staff',
      isAdmin: 'true',
    },
    ];
  }

  create(data) {
    const newUser = {
      token: accessToken,
      id: this.users.length + 1,
      email: data.email || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      password: data.password || '',
      type: data.type || '',
      isAdmin: data.isAdmin || '',
    };
    const password = bcrypt.hashSync(data.password);
    const accessToken = jwt.sign({
      id: newUser.id,
    }, SECRET_KEY, {
      expiresIn,
    });
    res.status(200).send({
      newUser,
      access_token: accessToken,
      expires_in: expiresIn,
    });
    this.users.push(newUser);
    return newUser;
  }

  findOne(id) {
    return this.users.find((user) => user.id === id);
  }

  findAll() {
    return this.users;
  }

  update(id, data) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users[index].id = data.id || user.id;
    this.users[index].email = data.email || user.email;
    this.users[index].firstName = data.firstName || user.firstName;
    this.users[index].lastName = data.lastName || user.lastName;
    this.users[index].password = data.password || user.password;
    this.users[index].type = data.type || user.type;
    this.users[index].isAdmin = data.isAdmin || user.isAdmin;
    this.users[index].accountNumber = data.accountNumber || user.accountNumber;
    this.userAccounts[index].modifiedDate = new Date();
    return this.userAccounts[index];
  }

  delete(id) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.user.splice(index, 1);
    return {};
  }
}
module.exports = User;
