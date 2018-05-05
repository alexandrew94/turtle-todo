RegisterCtrl.$inject = ['$auth', '$state'];

function RegisterCtrl($auth, $state) {
  this.data = {};
  function handleRegister() {
    $auth
      .signup(this.data)
      .then(res => $state.go('tasksHome', { id: res.data.user._id }));
  }
  this.handleRegister = handleRegister;
}

export default RegisterCtrl;
