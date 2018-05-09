TasksNewCtrl.$inject = ['$http', '$state', '$rootScope'];

function TasksNewCtrl($http, $state, $rootScope) {
  this.data = {};
  function handleCreate(){
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
    console.log('Location as a string--->', this.data.locationTitle);
    this.data.location = location;
  }

  this.handleCreate = handleCreate;
  this.updateLocation = updateLocation;
}

export default TasksNewCtrl;
