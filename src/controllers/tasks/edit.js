TasksEditCtrl.$inject = ['$http', '$state', '$rootScope'];

function TasksEditCtrl($http, $state, $rootScope){
  this.task = {};

  $http.get(`/api/users/${$state.params.id}/tasks/${$state.params.taskId}`)
    .then(res => {
      this.task = res.data;
      this.task.dueDate = new Date(res.data.dueDate);
    });

  function handleUpdate(){
    $rootScope.$broadcast('flashMessage', {
      content: 'Task successfully edited!'
    });
    $http.post(`/api/users/${$state.params.id}/tasks/${$state.params.taskId}`, this.task)
      .then(() => $state.go('tasksHome', { id: $state.params.id }));
  }

  function handleDelete(){
    $rootScope.$broadcast('flashMessage', {
      content: 'Task successfully deleted!'
    });
    $http.delete(`/api/users/${$state.params.id}/tasks/${$state.params.taskId}`, this.task)
      .then(() => $state.go('tasksHome', { id: $state.params.id }));
  }

  function updateLocation(location){
    this.data.location = location;
  }


  this.updateLocation = updateLocation;
  this.handleUpdate = handleUpdate;
  this.handleDelete = handleDelete;
}

export default TasksEditCtrl;
