TasksNewCtrl.$inject = ['$http', '$state', '$rootScope'];

function TasksNewCtrl($http, $state, $rootScope) {
  this.data = {};
  function handleCreate(){
    $rootScope.$broadcast('flashMessage', {
      content: 'Task created!'
    });
    $http.post(`/api/users/${$state.params.id}/tasks`, this.data)
      .then(() => $state.go('tasksHome', { id: $state.params.id }));
  }

  function updateLocation(location){
    this.data.location = location;
  }

  this.handleCreate = handleCreate;
  this.updateLocation = updateLocation;
}

export default TasksNewCtrl;
