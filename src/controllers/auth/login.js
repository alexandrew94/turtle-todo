LoginCtrl.$inject = ['$auth', '$state'];

function LoginCtrl($auth, $state) {
  this.data = {};

  function handleLogin() {
    $auth
      .login(this.data)
      .then(res => {
        localStorage.setItem('currentUser', JSON.stringify(res.data.user));
        $state.go('tasksHome', { id: res.data.user._id });
      });
  }

  this.handleLogin = handleLogin;
}

export default LoginCtrl;
