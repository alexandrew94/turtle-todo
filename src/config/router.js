Router.$inject = ['$stateProvider', '$urlRouterProvider'];

function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/views/home.html'
    })
    .state('tasksHome',{
      url: '/users/:id/tasks',
      templateUrl: 'views/tasks/index.html',
      controller: 'TasksIndexCtrl as tasksIndex'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/auth/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/auth/register.html',
      controller: 'RegisterCtrl as register'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'views/auth/show.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: 'views/auth/edit.html',
      controller: 'UsersEditCtrl as usersEdit'
    })
    .state('tasksNew', {
      url: '/users/:id/newtask',
      templateUrl: 'views/tasks/new.html',
      controller: 'TasksNewCtrl as tasksNew'
    })
    .state('tasksEdit', {
      url: '/users/:id/editTask/:taskId',
      templateUrl: 'views/tasks/edit.html',
      controller: 'TasksEditCtrl as tasksEdit'
    });
  $urlRouterProvider.otherwise('/');
}

export default Router;
