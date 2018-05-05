UsersEditCtrl.$inject = ['$http', '$state'];

function UsersEditCtrl($http, $state) {
  this.user = {};

  function handleUsersEdit() {
    $http
      .put(`/api/users/${$state.params.id}`, this.user)
      .then(res => $state.go('usersShow', { id: res.data._id }));
  }
  this.handleUsersEdit = handleUsersEdit;
}

export default UsersEditCtrl;
