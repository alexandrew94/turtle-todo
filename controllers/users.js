const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

// Displaying all the users (will probably not be in prod, except for possible leaderboard)
function usersIndex(req, res, next) {
  User
    .find()
    .then(user => res.json(user))
    .catch(err => next(err));
}

// Creating a new user
// function usersCreate(req, res, next) {
//   User
//     .create(req.body)
//     .then(user => res.status(201).json(user))
//     .catch(err => next(err));
// }

//Register/USER Create
function usersCreate(req, res ,next){
  User.create(req.body)
    .then(user => {
      const token = jwt.sign({ sub: user._id}, secret, { expiresIn: '6h'});
      res.status(201).json({
        message: `Thanks for registering ${user.username}!`,
        token,
        user
      });

    })
    .catch(next);
}
//Login system.
function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const token = jwt.sign({ sub: user._id}, secret, { expiresIn: '6h'});
      res.json({
        message: `Welcome Back ${user.username}!`,
        token,
        user
      });
    })
    .catch(next);
}

// Remaining tasks:

module.exports = {
  usersIndex: usersIndex,
  usersCreate: usersCreate,
  login: login
};
