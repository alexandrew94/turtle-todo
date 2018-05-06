TasksNewCtrl.$inject = ['$http', '$state'];


function TasksNewCtrl($http, $state) {
  this.data = {};
  function handleCreate(){

    $http.post(`/api/users/${$state.params.id}/tasks`, this.data)
      .then(() => $state.go('tasksHome', { id: $state.params.id }));
  }
  this.handleCreate = handleCreate;
}

export default TasksNewCtrl;
