TasksIndexCtrl.$inject = ['$http','$state'];

function TasksIndexCtrl($http, $state) {
  this.all = [];
  console.log('User Id--->',$state.params.id);
  $http.get(`/api/users/${$state.params.id}/tasks`)
  // .then(res => console.log('Users tasks --->', res.data));
    .then(res => this.all = res.data);
}

export default TasksIndexCtrl;


// function findById(id){
//   return $http.get(`/api/wines/${id}`);
// }

// Wine.findById($state.params.id)
//   .then(res => this.wine = res.data)
