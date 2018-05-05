UsersShowCtrl.$inject = ['$http', '$state'];

function UsersShowCtrl($http, $state) {
  this.user = {};
  $http
    .get(`/api/users/${$state.params.id}`)
    .then(res => this.user = res.data)
    .then(() => $state.go('usersShow', { id: this.user._id }));

  function handleUsersDelete() {
    $http
      .delete(`/api/users/${$state.params.id}`)
      .then(() => $state.go('home'));
  }

  this.handleUsersDelete = handleUsersDelete;
}

export default UsersShowCtrl;
