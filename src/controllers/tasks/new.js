TasksNewCtrl.$inject = ['$http', '$state'];


function TasksNewCtrl($http, $state) {
  this.data = {};
  console.log('User Id--->',$state.params.id);

  function handleCreate(){

    $http.post(`/api/users/${$state.params.id}/tasks`, this.data)
      .then(() => $state.go('tasksHome'));
  }
  this.handleCreate = handleCreate;
}

export default TasksNewCtrl;
