const router = require('express').Router();
const users = require('../controllers/users');
const tasks = require('../controllers/tasks');

router.route('/users')
  .post(users.usersCreate)
  .get(users.usersIndex);

router.route('/users/:id')
  .get(tasks.tasksIndex)
  .post(tasks.tasksCreate);

router.route('/users/:id/tasks/:taskId')
  .get(tasks.tasksShow);

router.route('/users/:id/tasks/:taskId/complete')
  .post(tasks.tasksComplete);

module.exports = router;
