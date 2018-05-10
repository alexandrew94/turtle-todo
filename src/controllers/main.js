MainCtrl.$inject = ['$auth', '$state', '$rootScope', '$timeout','$transitions'];

function MainCtrl($auth, $state, $rootScope, $timeout, $transitions) {
  this.isHome = true;
  this.navBarIsOpen = false;
  this.currentUser;
  this.isAuthenticated = $auth.isAuthenticated;

  this.setCurrentUser = function setCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    $auth.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  };

  this.handleLogout = function handleLogout() {
    $auth.logout();
    $rootScope.$broadcast('flashMessage', {
      style: 'primary',
      content: 'Log out successful!'
    });
    localStorage.removeItem('currentUser');
    $state.go('home');
  };

  $rootScope.$on('flashMessage', (e, data) => {
    this.flashMessage = data;
    $timeout(() => this.flashMessage = null, 2000);
  });

  $rootScope.$on('congrats', (e, data) => {
    this.congrats = data;
    console.log(data);
    $timeout(() => this.congrats = null, 2500);
  });

  $transitions.onSuccess({}, (transition) => {
    this.isHome = (transition.to().name === 'tasksHome');
    this.navBarIsOpen = false;
  });

  function toggleNav(){
    this.navBarIsOpen = !this.navBarIsOpen;
  }

  this.toggleNav = toggleNav;

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  this.scrollToTop = scrollToTop;

}

export default MainCtrl;
