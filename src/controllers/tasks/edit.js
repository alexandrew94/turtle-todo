TasksEditCtrl.$inject = ['$http', '$state', '$rootScope', '$scope'];

function TasksEditCtrl($http, $state, $rootScope,$scope){
  this.task = {};

  $http.get(`/api/users/${$state.params.id}/tasks/${$state.params.taskId}`)
    .then(res => {
      this.task = res.data;
      this.task.dueDate = new Date(res.data.dueDate);
      this.task.time = new Date(`1970-01-01T${this.task.time}:00Z`);
      // console.log('Location title-->',this.task);
    });

  function handleUpdate(){
    $rootScope.$broadcast('flashMessage', {
      style: 'primary',
      content: 'Task successfully edited!'
    });
    $http.post(`/api/users/${$state.params.id}/tasks/${$state.params.taskId}`, this.task)
      .then(() => $state.go('tasksHome', { id: $state.params.id }));
  }

  function handleDelete(){
    $rootScope.$broadcast('flashMessage', {
      style: 'neutral',
      content: 'Task successfully deleted!'
    });
    $http.delete(`/api/users/${$state.params.id}/tasks/${$state.params.taskId}`, this.task)
      .then(() => $state.go('tasksHome', { id: $state.params.id }));
  }

  function updateLocation(location){
    this.task.location = location;
    // console.log('Location--->', this.task.location);
    $scope.$apply();
  }


  this.handleUpdate = handleUpdate;
  this.handleDelete = handleDelete;
  this.updateLocation = updateLocation;
}

export default TasksEditCtrl;
