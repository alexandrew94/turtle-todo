import angular from 'angular';
// 3rd party dependincies
import '@uirouter/angularjs';
import 'satellizer';
import 'angular-moment';

import Router from './config/router';
import Auth from './config/auth';
import 'bulma';
import './scss/main.scss';

import MainCtrl from './controllers/main';
import LoginCtrl from './controllers/auth/login';
import RegisterCtrl from './controllers/auth/register';
import UsersShowCtrl from './controllers/auth/show';
import UsersEditCtrl from './controllers/auth/edit';
import TasksIndexCtrl from './controllers/tasks/index';
import TasksNewCtrl from './controllers/tasks/new';
import TasksEditCtrl from './controllers/tasks/edit';
//Directives
import gMap from './directives/gMap';
import gMapMax from './directives/gMapMax';
import gAutocomplete from './directives/gAutocomplete';

// import './scss/style.scss';


angular.module('todo', ['ui.router', 'satellizer', 'angularMoment'])
  .config(Router)
  .config(Auth)
  .controller('MainCtrl', MainCtrl)
  .controller('LoginCtrl', LoginCtrl)
  .controller('TasksIndexCtrl', TasksIndexCtrl)
  .controller('TasksNewCtrl', TasksNewCtrl)
  .controller('TasksEditCtrl', TasksEditCtrl)
  .controller('RegisterCtrl', RegisterCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .directive('gMap', gMap)
  .directive('gMapMax', gMapMax)
  .directive('gAutocomplete', gAutocomplete);
