const router = require('express').Router();
const users = require('../controllers/users');
const tasks = require('../controllers/tasks');
const secureRoute = require('../lib/secureRoute');

router.route('/users')
  .post(users.usersCreate)
  .get(users.usersIndex);

router.route('/users/:id')
  .get(secureRoute, tasks.tasksIndex)
  .post(secureRoute, tasks.tasksCreate);

router.post('/login', users.login);

router.route('/users/:id/tasks/:taskId')
  .get(secureRoute, tasks.tasksShow)
  .post(secureRoute, tasks.tasksEdit)
  .delete(secureRoute, tasks.tasksDelete);

router.route('/users/:id/tasks/:taskId/complete')
  .post(secureRoute, tasks.tasksComplete);

module.exports = router;
