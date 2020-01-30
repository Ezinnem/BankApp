const UserModel = require('../models/user');


const User = {

  create(req, res) {
    if (!req.body.id && !req.body.email && !req.body.firstName && !req.body.lastName && !req.body.password && !req.body.type && !req.body.isAdmin) {
      return res.status(400).send({
        message: 'All fields are required',
      });
    }
    const user = UserModel.create(req.body);
    return res.status(201).send(user);
  },
  // /**
  //  *
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} reflections array
  //  */
  getAll(req, res) {
    const users = UserModel.findAll();
    return res.status(200).send(users);
  },
  // /**
  //  *
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} reflection object
  //  */
  getOne(req, res) {
    const user = UserModel.findOne(req.params.id);
    if (!user) {
      return res.status(404).send({
        message: 'user not found',
      });
    }
    return res.status(200).send(user);
  },
  // /**
  //  *
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} updated reflection
  //  */
  update(req, res) {
    const user = UserModel.findOne(req.params.id);
    if (!user) {
      return res.status(404).send({
        message: 'userAccount not found',
      });
    }
    const updatedUser = UserModel.update(req.params.id, req.body);
    return res.status(200).send(updatedUser);
  },
  // /**
  //  *
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void} return statuc code 204
  //  */
  delete(req, res) {
    const user = UserModel.findOne(req.params.id);
    if (!user) {
      return res.status(404).send({
        message: 'user not found',
      });
    }
    const del = UserModel.delete(req.params.id);
    return res.status(204).send(del);
  },
};

module.exports = User;
