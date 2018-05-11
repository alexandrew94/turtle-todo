secureState.$inject = ['$q', '$auth', '$state', '$stateParams', '$rootScope'];
function secureState($q, $auth, $state, $stateParams, $rootScope) {
  return new $q((resolve) => {
    if($auth.isAuthenticated()) {
      if($stateParams.id === $auth.getPayload().sub) {
        return resolve();
      }
      $rootScope.$broadcast('flashMessage', {
        style: 'invalid',
        content: 'Incorrect URL.'
      });
      return $state.go('tasksHome', { id: $auth.getPayload().sub });
    }
    $rootScope.$broadcast('flashMessage', {
      style: 'invalid',
      content: 'You must be logged in to visit that page.'
    });
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
    })
    .state('tasksEdit', {
      url: '/users/:id/editTask/:taskId',
      templateUrl: 'views/tasks/edit.html',
      controller: 'TasksEditCtrl as tasksEdit',
      resolve: { secureState }
    });
  $urlRouterProvider.otherwise(function ($injector) {
    var $state = $injector.get('$state');
    var $auth = $injector.get('$auth');
    var $rootScope = $injector.get('$rootScope');
    if ($auth.getPayload()) {
      $rootScope.$broadcast('flashMessage', {
        style: 'invalid',
        content: 'Invalid URL!'
      });
      return $state.go('tasksHome', { id: $auth.getPayload().sub });
    } else {
      return $state.go('home');
    }
  });
}

export default Router;
