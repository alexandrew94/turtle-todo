UsersShowCtrl.$inject = ['$http', '$state', '$scope'];

function UsersShowCtrl($http, $state, $scope) {
  this.user = {};
  this.selectedTask = null;

  $http
    .get(`/api/users/${$state.params.id}`)
    .then(res => this.user = res.data)
    .then(() => $state.go('usersShow', { id: this.user._id }));



  function totalScore() {
    $http
      .get(`/api/users/${$state.params.id}`)
      .then(res => {
        $scope.dishwashingScore = {
          "background-color" : "#2176AE",
          "width" : `${(res.data.dishwashingScore/res.data.score)*100}%`
        };
        $scope.takeOutRecyclingAndBinsScore = {
          "background-color" : "#57B8FF",
          "width" : `${(res.data.takeOutRecyclingAndBinsScore/res.data.score)*100}%`
        };
        $scope.changeTheBedSheetsScore = {
          "background-color" : "#B66D0D",
          "width" : `${(res.data.changeTheBedSheetsScore/res.data.score)*100}%`
        };
        $scope.takeCareOfBinsScore = {
          "background-color" : "#FBB13C",
          "width" : `${(res.data.takeCareOfBinsScore/res.data.score)*100}%`
        };
        $scope.checkAndChangeLightbulbsScore = {
          "background-color" : "#FE6847",
          "width" : `${(res.data.checkAndChangeLightbulbsScore/res.data.score)*100}%`
        };
        $scope.cleanKitchenScore = {
          "background-color" : "#1C3144",
          "width" : `${(res.data.cleanKitchenScore/res.data.score)*100}%`
        };
        $scope.cleanBathroomScore = {
          "background-color" : "#D00000",
          "width" : `${(res.data.cleanBathroomScore/res.data.score)*100}%`
        };
        $scope.cleanBedroomScore = {
          "background-color" : "#FFBA08",
          "width" : `${(res.data.cleanBedroomScore/res.data.score)*100}%`
        };
        $scope.cleanLivingRoomScore = {
          "background-color" : "#A2AEBB",
          "width" : `${(res.data.cleanLivingRoomScore/res.data.score)*100}%`
        };
        $scope.deepCleanScore = {
          "background-color" : "#3F88C5",
          "width" : `${(res.data.deepCleanScore/res.data.score)*100}%`
        };
        $scope.foodShoppingScore = {
          "background-color" : "#EE6352",
          "width" : `${(res.data.foodShoppingScore/res.data.score)*100}%`
        };
        $scope.cleaningEquipmentScore = {
          "background-color" : "#59CD90",
          "width" : `${(res.data.cleaningEquipmentScore/res.data.score)*100}%`
        };
        $scope.ikeaScore = {
          "background-color" : "#3FA7D6",
          "width" : `${(res.data.ikeaScore/res.data.score)*100}%`
        };
        $scope.walkTheDogScore = {
          "background-color" : "#FAC05E",
          "width" : `${(res.data.walkTheDogScore/res.data.score)*100}%`
        };
        $scope.cleanOutTheCarScore = {
          "background-color" : "#F79D84",
          "width" : `${(res.data.cleanOutTheCarScore/res.data.score)*100}%`
        };
        $scope.workOnGardenScore = {
          "background-color" : "#E8B71A",
          "width" : `${(res.data.workOnGardenScore/res.data.score)*100}%`
        };
        $scope.exerciseScore = {
          "background-color" : "#DDE7C7",
          "width" : `${(res.data.exerciseScore/res.data.score)*100}%`
        };
        $scope.updatingComputerSoftwareScore = {
          "background-color" : "#BFD8BD",
          "width" : `${(res.data.updatingComputerSoftwareScore/res.data.score)*100}%`
        };
        $scope.clothesWashingScore = {
          "background-color" : "#77BFA3",
          "width" : `${(res.data.clothesWashingScore/res.data.score)*100}%`
        };
      });
  }

  // "width": `${(task % 25)*100}%`

  this.taskScore = {};

  function selectTask(task){
    this.selectedTask = task;
  }

  function unSelectTask() {
    this.selectedTask = null;
  }

  function isSelectedTask(task) {
    return this.selectedTask === task;
  }

  function showDetails(scorename) {
    this.taskScore.title = scorename.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){
      return str.toUpperCase();
    });
    this.taskScore.data = this.user[scorename];
    this.taskScore.percentage = Math.round((this.user[scorename]/this.user.score)*100);
  }

  function userTaskLevel(task){
    return Math.floor(task/25);
  }

  function userExBar(task, taskName){
    $scope[`expBarMove${taskName}`] = { 'width': `${((task % 25) / 25 )*100}%`};
  }
  //$scope[`expBarMove${taskName}`] = width: `${(task % 25 )*100}%`
  this.selectTask = selectTask;
  this.unSelectTask = unSelectTask;
  this.isSelectedTask = isSelectedTask;
  this.userExBar = userExBar;
  this.showDetails = showDetails;
  this.userTaskLevel = userTaskLevel;
  this.totalScore = totalScore;


}

export default UsersShowCtrl;
