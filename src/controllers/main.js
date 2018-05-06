function MainCtrl() {
  this.currentUser;

  function setCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  this.setCurrentUser = setCurrentUser;
}

export default MainCtrl;
