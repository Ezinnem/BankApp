const UserTransactionModel = require('../models/transaction');

const UserTransaction = {

  create(req, res) {
    if (!req.body.id && !req.body.createdOn && !req.body.type && !req.body.accountNumber && !req.body.cashier && !req.body.amount && !req.body.oldBalance && !req.body.newBalance) {
      return res.status(400).send({
        message: 'All fields are required',
      });
    }
    const userTransaction = UserTransactionModel.create(req.body);
    return res.status(201).send(userTransaction);
  },
  // /**
  //  *
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} reflections array
  //  */
  getAll(req, res) {
    const userTransactions = UserTransactionModel.findAll();
    return res.status(200).send(userTransactions);
  },
  // /**
  //  *
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} reflection object
  //  */
  getOne(req, res) {
    const userTransaction = UserTransactionModel.findOne(req.params.id);
    if (!userTransaction) {
      return res.status(404).send({
        message: 'Transaction not found',
      });
    }
    return res.status(200).send(userTransction);
  },
  // /**
  //  *
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} updated reflection
  //  */
  update(req, res) {
    const userTransaction = UserTransactionModel.findOne(req.params.id);
    if (!userTransaction) {
      return res.status(404).send({
        message: 'Transaction not found',
      });
    }
    const updatedUserTransaction = UserTransactionModel.update(req.params.id, req.body);
    return res.status(200).send(updatedUserTransaction);
  },
  // /**
  //  *
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void} return statuc code 204
  //  */
  delete(req, res) {
    const userTransaction = UserTransactionModel.findOne(req.params.id);
    if (!userTransaction) {
      return res.status(404).send({
        message: 'userAccount not found',
      });
    }
    const ref = UserTransactionModel.delete(req.params.id);
    return res.status(204).send(ref);
  },
};

module.exports = UserTransaction;
