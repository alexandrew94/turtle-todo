MainCtrl.$inject = ['$auth', '$state', '$rootScope', '$timeout'];

function MainCtrl($auth, $state, $rootScope, $timeout) {
  this.currentUser;
  this.isAuthenticated = $auth.isAuthenticated;

  this.setCurrentUser = function setCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    $auth.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  };

  this.handleLogout = function handleLogout() {
    $auth.logout();
    $rootScope.$broadcast('flashMessage', {
      content: 'Log out successful!'
    });
    localStorage.removeItem('currentUser');
    $state.go('home');
  };

  $rootScope.$on('flashMessage', (e, data) => {
    this.flashMessage = data;
    $timeout(() => this.flashMessage = null, 2000);
  });
}

export default MainCtrl;
