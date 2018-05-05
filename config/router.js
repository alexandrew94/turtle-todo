const router = require('express').Router();
const users = require('../controllers/users');
const tasks = require('../controllers/tasks');
const secureRoute = require('../lib/secureRoute');

router.route('/users')
  .get(users.usersIndex);

router.route('/users/:id')
  .get(secureRoute, users.usersShow)
  .put(secureRoute, users.usersEdit)
  .delete(secureRoute, users.usersDelete);

router.route('/users/:id/tasks')
  .get(secureRoute, tasks.tasksIndex)
  .post(secureRoute, tasks.tasksCreate);

router.post('/login', users.login);

router.post('/register', users.usersCreate);

router.route('/users/:id/tasks/:taskId')
  .get(secureRoute, tasks.tasksShow)
  .post(secureRoute, tasks.tasksEdit)
  .delete(secureRoute, tasks.tasksDelete);

router.route('/users/:id/tasks/:taskId/complete')
  .post(secureRoute, tasks.tasksComplete);

module.exports = router;
