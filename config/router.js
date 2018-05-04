const router = require('express').Router();
const users = require('../controllers/users');

router.route('/users')
  .post(users.usersCreate)
  .get(users.usersIndex);

router.route('/users/:id')
  .get(users.tasksIndex)
  .post(users.tasksCreate);

router.route('/users/:id/tasks/:taskId')
  .get(users.tasksShow);

router.route('/users/:id/tasks/:taskId/complete')
  .post(users.tasksComplete);

module.exports = router;
