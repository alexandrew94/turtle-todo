loginCtrl.$inject = ['$auth', '$state'];

function loginCtrl($auth, $state) {
  this.data = {};
  this.handleLogin = function handleLogin() {
    $auth
      .login(this.data)
      .then(() => $state.go('tasksHome'));
  };
}

export default loginCtrl;
