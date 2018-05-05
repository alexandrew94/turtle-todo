UsersDeleteCtrl.$inject = ['$http', '$state'];

function UsersDeleteCtrl($http, $state) {
  this.user = {};

  function handleUsersDelete() {
    $http
      .delete(`/api/users/${$state.params.id}`)
      .then(() => $state.go('/'));
  }
  this.handleUsersDelete = handleUsersDelete;
}

export default UsersDeleteCtrl;
