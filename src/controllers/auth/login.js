LoginCtrl.$inject = ['$auth', '$state', '$rootScope'];

function LoginCtrl($auth, $state, $rootScope) {
  this.data = {};

  function handleLogin() {
    $auth
      .login(this.data)
      .then(res => {
        localStorage.setItem('currentUser', JSON.stringify(res.data.user));
        $rootScope.$broadcast('flashMessage', {
          style: 'primary',
          content: res.data.message
        });
        $state.go('tasksHome', { id: res.data.user._id });
      })
      .catch(err => {
        $rootScope.$broadcast('flashMessage', {
          style: 'invalid',
          content: err.data.message
        });
      });
  }

  this.handleLogin = handleLogin;
}

export default LoginCtrl;
