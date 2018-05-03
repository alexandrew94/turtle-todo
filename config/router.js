const router = require('express').Router();
const users = require('../controllers/users');

router.route('/users')
  .post(users.usersCreate)
  .get(users.usersIndex);

module.exports = router;
