Router.$inject = ['$stateProvider', '$urlRouterProvider'];

function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/views/home.html'
    })
    .state('tasksHome',{
      url: '/users/:id/tasks',
      templateUrl: 'views/tasks/index.html'
      // controller: 'TasksIndexCtrl as tasksIndex'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/auth/login.html',
      controller: 'LoginCtrl as login'
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;
