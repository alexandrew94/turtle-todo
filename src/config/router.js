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
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;
