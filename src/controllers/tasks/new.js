TasksNewCtrl.$inject = ['$http', '$state', '$rootScope', '$scope'];

function TasksNewCtrl($http, $state, $rootScope, $scope) {
  this.data = {};
  function handleCreate(){
    if (!this.data.time) {
      delete this.data.time;
    }
    console.log('LOGGING THIS DATA ON TASK NEW CREATE', this.data);
    if (!this.data.title) {
      return $rootScope.$broadcast('flashMessage', {
        content: 'Please enter a valid title!'
      });
    }
    if (!this.data.dueDate) {
      return $rootScope.$broadcast('flashMessage', {
        content: 'Please enter a valid due date!'
      });
    }
    $http.post(`/api/users/${$state.params.id}/tasks`, this.data)
      .then(() => $state.go('tasksHome', { id: $state.params.id }))
      .then(() => {
        $rootScope.$broadcast('flashMessage', {
          content: 'Task created!'
        });
      })
      .catch(() => {
        $rootScope.$broadcast('flashMessage', {
          content: 'Please ensure all required fields are filled!'
        });
      });
  }

  function updateLocation(location){
    this.data.location = location;
    console.log('Location--->', this.data.location);
    $scope.$apply();
  }
  this.handleCreate = handleCreate;
  this.updateLocation = updateLocation;
}

export default TasksNewCtrl;
