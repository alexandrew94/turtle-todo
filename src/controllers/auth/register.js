RegisterCtrl.$inject = ['$auth', '$state'];

function RegisterCtrl($auth, $state) {
  this.data = {};
  function handleRegister() {
    $auth
      .signup(this.data);
    $auth
      .login(this.data)
      .then(res => {
        localStorage.setItem('currentUser', JSON.stringify(res.data.user));
        $state.go('tasksHome', { id: res.data.user._id });
      });
  }
  this.handleRegister = handleRegister;
}

export default RegisterCtrl;
