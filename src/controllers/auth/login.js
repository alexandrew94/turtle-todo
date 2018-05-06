LoginCtrl.$inject = ['$auth', '$state', '$rootScope'];

function LoginCtrl($auth, $state, $rootScope) {
  this.data = {};

  function handleLogin() {
    $auth
      .login(this.data)
      .then(res => {
        $rootScope.currentUser = res.data.user;
        console.log($rootScope.currentUser);
        $state.go('tasksHome', { id: res.data.user._id });
      });
  }

  this.handleLogin = handleLogin;
}

export default LoginCtrl;
