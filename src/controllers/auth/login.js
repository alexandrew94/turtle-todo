LoginCtrl.$inject = ['$auth', '$state'];

function LoginCtrl($auth, $state) {
  this.data = {};
  this.handleLogin = function handleLogin() {
    $auth
      .login(this.data)
      .then(res => $state.go('tasksHome', { id:
        res.data.user._id}));

  };
}

export default LoginCtrl;
