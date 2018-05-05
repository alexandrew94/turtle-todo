// UserDeleteCtrl.$inject = ['$http', '$state'];
//
// function UserEditCtrl($http, $state) {
//   this.user = {};
//
//   function handleUsersEdit() {
//     $http
//       .put(`/api/users/${$state.params.id}`, this.user)
//       // .then(res => console.log(res.data._id))
//       .then(res => $state.go('usersShow', { id: res.data._id }));
//   }
//   this.handleUsersEdit = handleUsersEdit;
// }
//
// export default UserEditCtrl;
