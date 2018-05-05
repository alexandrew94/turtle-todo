import angular from 'angular';
// 3rd party dependincies
import '@uirouter/angularjs';
import 'satellizer';

import Router from './config/router';
import Auth from './config/auth';

import LoginCtrl from './controllers/auth/login';
import RegisterCtrl from './controllers/auth/register';
import UsersShowCtrl from './controllers/auth/show';
import UsersEditCtrl from './controllers/auth/edit';

import 'bulma';
// import './scss/style.scss';
// import UsersIndexCtrl from './controllers/users/index';


angular.module('todo', ['ui.router', 'satellizer'])
  .config(Router)
  .config(Auth)
  .controller('LoginCtrl', LoginCtrl)
  .controller('RegisterCtrl', RegisterCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl);
// .controller('UsersIndexCtrl', UsersIndexCtrl);
