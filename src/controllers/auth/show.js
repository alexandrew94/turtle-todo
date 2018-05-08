UsersShowCtrl.$inject = ['$http', '$state', '$auth', '$rootScope'];

function UsersShowCtrl($http, $state, $auth, $rootScope) {
  this.user = {};
  $http
    .get(`/api/users/${$state.params.id}`)
    .then(res => this.user = res.data)
    .then(() => $state.go('usersShow', { id: this.user._id }));

  function handleUsersDelete() {
    $http
      .delete(`/api/users/${$state.params.id}`)
      .then(() => {
        $auth.logout();
        localStorage.removeItem('currentUser');
        $rootScope.$broadcast('flashMessage', {
          content: 'User successfully deleted!'
        });
        $state.go('home');
      });
  }

  this.handleUsersDelete = handleUsersDelete;
}

export default UsersShowCtrl;
