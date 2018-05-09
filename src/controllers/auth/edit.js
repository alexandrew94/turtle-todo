UsersEditCtrl.$inject = ['$http', '$state', '$rootScope'];

function UsersEditCtrl($http, $state, $rootScope) {
  this.user = {};
  $http
    .get(`/api/users/${$state.params.id}`)
    .then(res => this.user = res.data);

  function handleUsersEdit() {
    $http
      .put(`/api/users/${$state.params.id}`, this.user)
      .then(res => {
        $rootScope.$broadcast('flashMessage', {
          content: 'Edit successful!'
        });
        $state.go('usersShow', { id: res.data._id });
      });
  }
  this.handleUsersEdit = handleUsersEdit;
}

export default UsersEditCtrl;
