UsersEditCtrl.$inject = ['$http', '$state', '$auth', '$rootScope'];

function UsersEditCtrl($http, $state, $auth, $rootScope) {
  this.user = {};
  $http
    .get(`/api/users/${$state.params.id}`)
    .then(res => this.user = res.data);

  function handleUsersEdit() {
    $http
      .put(`/api/users/${$state.params.id}`, this.user)
      .then(res => {
        $rootScope.$broadcast('flashMessage', {
          style: 'primary',
          content: 'Edit successful!'
        });
        $state.go('usersShow', { id: res.data._id });
      });
  }
  this.handleUsersEdit = handleUsersEdit;

  function handleUsersDelete() {
    $http
      .delete(`/api/users/${$state.params.id}`)
      .then(() => {
        $auth.logout();
        localStorage.removeItem('currentUser');
        $rootScope.$broadcast('flashMessage', {
          style: 'neutral',
          content: 'User successfully deleted!'
        });
        $state.go('home');
      });
  }

  this.handleUsersDelete = handleUsersDelete;
}

export default UsersEditCtrl;
