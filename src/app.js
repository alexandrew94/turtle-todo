import angular from 'angular';
// 3rd party dependincies
import '@uirouter/angularjs';
import 'satellizer';

import Router from './config/router';
import Auth from './config/auth';

import LoginCtrl from './controllers/auth/login';

import 'bulma';
// import './scss/style.scss';
// import UsersIndexCtrl from './controllers/users/index';


angular.module('todo', ['ui.router', 'satellizer'])
  .config(Router)
  .config(Auth)
  .controller('LoginCtrl', LoginCtrl);
// .controller('UsersIndexCtrl', UsersIndexCtrl);
