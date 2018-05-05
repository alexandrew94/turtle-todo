WinesNewCtrl.$inject = ['$http', '$state'];


function WinesNewCtrl($http, $state) {
  this.data = {}

  $http.post('/api/wines', data);


  .then(() => $state.go('tasksIndex'));
}
