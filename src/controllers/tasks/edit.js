TasksEditCtrl.$inject = ['$http', '$state', '$rootScope'];

function TasksEditCtrl($http, $state, $rootScope){
  this.task = {};

  $http.get(`/api/users/${$state.params.id}/tasks/${$state.params.taskId}`)
    .then(res => {
      this.task = res.data;
      this.task.dueDate = new Date(res.data.dueDate);
      this.task.time = new Date(`1970-01-01T${this.task.time}:00Z`);
      console.log('Saved time-->',this.task.time,'Converted time-->', new Date(res.data.time));
      // new Date("2015-03-25T12:00:00Z");


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
    this.task.location = location;
  }


  this.handleUpdate = handleUpdate;
  this.handleDelete = handleDelete;
  this.updateLocation = updateLocation;
}

export default TasksEditCtrl;
