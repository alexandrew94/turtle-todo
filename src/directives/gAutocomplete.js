/* global google */
function gAutocomplete(){
  return {
    restrict: 'A',
    scope: {
      handleChange: '&'
    },
    link($scope, $element){
      console.log($element);
      const autocomplete = new google.maps.places.Autocomplete($element[0]);
      autocomplete.addListener('place_changed', () => {
        $scope.handleChange({ location: autocomplete.getPlace().geometry.location.toJSON()});
      });
    }
  };
}

export default gAutocomplete;
