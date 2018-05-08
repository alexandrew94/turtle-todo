TasksIndexCtrl.$inject = ['$http','$state','$rootScope'];

function TasksIndexCtrl($http, $state, $rootScope) {

  this.all = [];
  this.todaysTasks = [];
  this.pastTasks = [];
  this.futureTasks = [];

  $http.get(`/api/users/${$state.params.id}/tasks`)
  // .then(res => console.log('Users tasks --->', res.data));
    .then(res => {
      this.all = res.data;
      this.todaysTasks = res.data[0];
      this.pastTasks = res.data[1];
      this.futureTasks = res.data[2];

    });

  function handleComplete(userId,taskId){
    $rootScope.$broadcast('flashMessage', {
      content: 'Great job! Task completed!'
    });
    $http
      .post(`/api/users/${userId}/tasks/${taskId}/complete`)
      .then(res => {
        this.all = res.data.tasks;
        $http.get(`/api/users/${$state.params.id}/tasks`)
          .then(res => {
            this.all = res.data;
            this.todaysTasks = res.data[0];
            this.pastTasks = res.data[1];
            this.futureTasks = res.data[2];
          });
      });
  }


  this.handleComplete = handleComplete;
}


export default TasksIndexCtrl;


// function findById(id){
//   return $http.get(`/api/wines/${id}`);
// }

// Wine.findById($state.params.id)
//   .then(res => this.wine = res.data)
