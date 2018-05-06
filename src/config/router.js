secureState.$inject = ['$q', '$auth', '$state', '$stateParams'];
function secureState($q, $auth, $state, $stateParams) {
  return new $q((resolve) => {
    console.log('stateParams ID', $stateParams.id);
    console.log('payload', $auth.getPayload().sub);
    if($auth.isAuthenticated() && $stateParams.id === $auth.getPayload().sub) return resolve();
    $state.go('login');
  });
}

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
      controller: 'TasksIndexCtrl as tasksIndex',
      resolve: { secureState }
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
      controller: 'UsersShowCtrl as usersShow',
      resolve: { secureState }
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: 'views/auth/edit.html',
      controller: 'UsersEditCtrl as usersEdit',
      resolve: { secureState }
    })
    .state('tasksNew', {
      url: '/users/:id/newtask',
      templateUrl: 'views/tasks/new.html',
      controller: 'TasksNewCtrl as tasksNew',
      resolve: { secureState }
    });
  $urlRouterProvider.otherwise('/');
}

export default Router;
