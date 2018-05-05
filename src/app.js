import angular from 'angular';
// 3rd party dependincies
import '@uirouter/angularjs';
import 'satellizer';

import Router from './config/router';
import Auth from './config/auth';

import 'bulma';
// import './scss/style.scss';
import TasksIndexCtrl from './controllers/tasks/index';
import LoginCtrl from './controllers/auth/login';

angular.module('todo', ['ui.router', 'satellizer'])
  .config(Router)
  .config(Auth)
  .controller('LoginCtrl', LoginCtrl)
  .controller('TasksIndexCtrl', TasksIndexCtrl);
// .controller('UsersIndexCtrl', UsersIndexCtrl);
