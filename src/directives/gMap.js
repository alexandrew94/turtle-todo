/* global google */
function gMap() {
  return {
    restrict: 'A',
    scope: {
      center: '='
    },
    link($scope, $element){
      const map = new google.maps.Map($element[0], {
        center: {lat: 51, lng: -0.78},
        zoom: 12,
        styles: [
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                'elementType': 'labels',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },

              {
                "hue": "#FFA800"
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              {
                "hue": "#679714"
              },
              {
                "saturation": 33.4
              },
              {
                "lightness": -25.4
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "hue": "#53FF00"
              },
              {
                "saturation": -73
              },
              {
                "lightness": 40
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
              {
                "hue": "#FBFF00"
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
              {
                "hue": "#00FFFD"
              },
              {
                "lightness": 30
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              {
                "hue": "#00BFFF"
              },
              {
                "saturation": 6
              },
              {
                "lightness": 8
              },
              {
                "gamma": 1
              }
            ]
          }
        ],
        disableDefaultUI: true
      });

      const marker = new google.maps.Marker({
        map: map,
        position: map.getCenter()
      });
      $scope.$watch('center', () => {
        map.setCenter($scope.center);
        marker.setPosition($scope.center);
      });
    }
  };
}

export default gMap;
