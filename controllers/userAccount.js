const UserAccountModel = require('../models/userAccount');

const UserAccount = {

  create(req, res) {
    if (!req.body.id && !req.body.accountNumber && !req.body.createdOn && !req.body.owner && !req.body.type && !req.body.status && !req.body.balance) {
      return res.status(400).send({
        message: 'All fields are required',
      });
    } 
    const userAccount = UserAccountModel.create(req.body);
    return res.status(201).send(userAccount);
  },
  // /**
  //  *
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} reflections array
  //  */
  getAll(req, res) {
    const userAccounts = UserAccountModel.findAll();
    return res.status(200).send(userAccounts);
  },
  // /**
  //  *
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} reflection object
  //  */
  getOne(req, res) {
    const userAccount = UserAccountModel.findOne(req.params.id);
    if (!userAccount) {
      return res.status(404).send({
        message: 'userAccount not found',
      });
    }
    return res.status(200).send(userAccount);
  },
  // /**
  //  *
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} updated reflection
  //  */
  update(req, res) {
    const userAccount = UserAccountModel.findOne(req.params.id);
    if (!userAccount) {
      return res.status(404).send({
        message: 'userAccount not found',
      });
    }
    const updatedUserAccount = UserAccountModel.update(req.params.id, req.body);
    return res.status(200).send(updatedUserAccount);
  },
  // /**
  //  *
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void} return statuc code 204
  //  */
  delete(req, res) {
    const userAccount = UserAccountModel.findOne(req.params.id);
    if (!userAccount) {
      return res.status(404).send({
        message: 'userAccount not found',
      });
    }
    const ref = UserAccountModel.delete(req.params.id);
    return res.status(204).send(ref);
  },
};

module.exports = UserAccount;
