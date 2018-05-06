TasksEditCtrl.$inject = ['$http', '$state'];

function TasksEditCtrl($http, $state){
  this.task = {};

  $http.get(`/api/users/${$state.params.id}/tasks/${$state.params.taskId}`)
    .then(res => this.task = res.data);

  function handleUpdate(){
    $http.post(`/api/users/${$state.params.id}/tasks/${$state.params.taskId}`, this.task)
      .then(() => $state.go('tasksHome', { id: $state.params.id }));
  }
  this.handleUpdate = handleUpdate;
}

export default TasksEditCtrl;
