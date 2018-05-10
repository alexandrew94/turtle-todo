TasksIndexCtrl.$inject = ['$http','$state','$rootScope','$timeout'];

function TasksIndexCtrl($http, $state, $rootScope, $timeout) {

  this.all = [];
  this.todaysTasks = [];
  this.pastTasks = [];
  this.futureTasks = [];

  this.selectedTask = null;

  $http.get(`/api/users/${$state.params.id}/tasks`)
  // .then(res => console.log('Users tasks --->', res.data));
    .then(res => {
      this.all = res.data;
      this.todaysTasks = res.data[0];
      this.pastTasks = res.data[1];
      this.futureTasks = res.data[2];
    });

  function handleComplete(userId,taskId){
    $http.get(`/api/users/${$state.params.id}/tasks/${taskId}`)
      .then( res => {
        $http.get(`/api/users/${$state.params.id}`)
          .then(result => {
            $rootScope.$broadcast('congrats', {
              score: `${result.data[`${res.data.title}Score`]}`,
              title: `${res.data.displayTitle}`
            });
          });
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


  function selectTask(task){
    this.selectedTask = task;
  }

  function unSelectTask() {
    this.selectedTask = null;
  }

  function isSelectedTask(task) {
    return this.selectedTask === task;
  }

  this.selectTask = selectTask;
  this.unSelectTask = unSelectTask;
  this.isSelectedTask = isSelectedTask;
  this.handleComplete = handleComplete;
}


export default TasksIndexCtrl;


// function findById(id){
//   return $http.get(`/api/wines/${id}`);
// }

// Wine.findById($state.params.id)
//   .then(res => this.wine = res.data)
