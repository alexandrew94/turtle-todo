MainCtrl.$inject = ['$auth', '$state'];

function MainCtrl($auth, $state) {
  this.currentUser;
  this.isAuthenticated = $auth.isAuthenticated;

  this.setCurrentUser = function setCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    $auth.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  };

  this.handleLogout = function handleLogout() {
    $auth.logout();
    localStorage.removeItem('currentUser');
    $state.go('home');
  };
}

export default MainCtrl;
