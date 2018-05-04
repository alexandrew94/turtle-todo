import angular from 'angular';
// 3rd party dependincies
import '@uirouter/angularjs';
// import 'satellizer';

import Router from './config/router';
import 'bulma';
// import './scss/style.scss';
// import UsersIndexCtrl from './controllers/users/index';


angular.module('todo', ['ui.router'])
  .config(Router);
// .controller('UsersIndexCtrl', UsersIndexCtrl);
