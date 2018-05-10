RegisterCtrl.$inject = ['$auth', '$state', '$rootScope'];

function RegisterCtrl($auth, $state, $rootScope) {
  this.data = {};
  this.message;
  function handleRegister() {
    $auth
      .signup(this.data)
      .then(() => {
        $auth
          .login(this.data)
          .then(res => {
            localStorage.setItem('currentUser', JSON.stringify(res.data.user));
            $rootScope.$broadcast('flashMessage', {
              style: 'primary',
              content: 'Thanks for signing up. Welcome to our app!'
            });
            $state.go('tasksHome', { id: res.data.user._id });
          });
      })
      .catch(err => this.message = err.data);
  }
  this.handleRegister = handleRegister;
}

export default RegisterCtrl;
