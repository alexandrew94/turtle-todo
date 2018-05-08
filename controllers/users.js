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

// Show the current user
function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => next(err));
}

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
        return res.status(401).json({ message: 'Incorrect email or password.' });
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

// Letting the currently logged in user edit themselves
function usersEdit(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => {
      if (user.id === req.currentUser.id) {
        user = Object.assign(user, req.body);
        user.save();
        return res.json(user);
      } else {
        return res.json({ message: 'Unauthorized' });
      }
    })
    .catch(err => next(err));
}

// Letting the currently logged in user delete themselves
function usersDelete(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => {
      if (user.id === req.currentUser.id) {
        user.remove();
        return res.json({ message: 'User successfully removed' });
      } else {
        return res.json({ message: 'Unauthorized' });
      }
    })
    .catch(err => next(err));
}

// Remaining tasks:
module.exports = {
  usersIndex: usersIndex,
  usersShow: usersShow,
  usersCreate: usersCreate,
  usersEdit: usersEdit,
  usersDelete: usersDelete,
  login: login
};
