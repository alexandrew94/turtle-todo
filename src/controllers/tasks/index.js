TasksIndexCtrl.$inject = ['$http','$state'];

function TasksIndexCtrl($http, $state) {
  this.all = [];
  this.todaysTasks = [];
  this.pastTasks = [];
  this.futureTasks = [];
  // console.log('User Id--->',$state.params.id);
  // console.log('LOGGING ALL CURRENT USER TASKS', this.all);
  $http.get(`/api/users/${$state.params.id}/tasks`)
  // .then(res => console.log('Users tasks --->', res.data));
    .then(res => {
      this.all = res.data;
      this.todaysTasks = res.data[0];
      this.pastTasks = res.data[1];
      this.futureTasks = res.data[2];

    });

  function handleComplete(userId,taskId){
    $http.post(`/api/users/${userId}/tasks/${taskId}/complete`, this.task)
      .then(res => this.all = res.data.tasks);
  }


  this.handleComplete = handleComplete;
}


export default TasksIndexCtrl;


// function findById(id){
//   return $http.get(`/api/wines/${id}`);
// }

// Wine.findById($state.params.id)
//   .then(res => this.wine = res.data)
