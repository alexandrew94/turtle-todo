const User = require('../models/user');

function usersIndex(req, res, next) {
  User
    .find()
    .then(user => res.json(user))
    .catch(err => next(err));
}

function usersCreate(req, res, next) {
  User
    .create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => next(err));
}

module.exports = {
  usersIndex: usersIndex,
  usersCreate: usersCreate
};
