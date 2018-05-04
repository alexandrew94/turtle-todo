const User = require('../models/user');

// Displaying all the users (will probably not be in prod, except for possible leaderboard)
function usersIndex(req, res, next) {
  User
    .find()
    .then(user => res.json(user))
    .catch(err => next(err));
}

// Creating a new user
function usersCreate(req, res, next) {
  User
    .create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => next(err));
}

// Remaining tasks:

module.exports = {
  usersIndex: usersIndex,
  usersCreate: usersCreate
};
