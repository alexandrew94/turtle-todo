TasksIndexCtrl.$inject = ['$http','$state'];

function TasksIndexCtrl($http, $state) {
  this.all = [];

  console.log('User Id--->',$state.params.id);
  const id = $state.params.id;
  $http.get(`/api/users/${id}/tasks`)
    .then(res => this.all = res.data);
  console.log('Users tasks --->', this);

}

export default TasksIndexCtrl;


// function findById(id){
//   return $http.get(`/api/wines/${id}`);
// }

// Wine.findById($state.params.id)
//   .then(res => this.wine = res.data)
