

var app = angular.module('myApp', []);
app.controller('haikuCtrl', function($scope, $interval, $http) {

    $interval(getPoems, 3000);

    //$scope.poems = /*function call to get poems*/;



    // };



      // $scope.results = [];

      // $scope.search = function () {
      //     $http.get('/your/url/search', { params: user },//TODO:
      //       function (response) { $scope.results = response; },
      //       function (failure) { console.log("failed :(", failure); });

  //     $scope.buttonClicks = 0;
  //     $scope.handleButtonClick = function(){
  //       $scope.buttonClicks++;
  //     }

  //   }
  // ]);




  //TODO: make server render information upon request,
  //have it re-render when the data is pulled

  function getPoems(){

    return $http({
        method: 'GET',
        url: '/getPoems',//TODO:
      })
      .then(function (resp) {
        console.log("resp====>", resp.data);
        return resp.data;
      });

  }

});

// angular.module('myApp', [])

// .factory('Haikus', function ($http) {

//   var getAll = function() {//just call getAll at set interval upon document ready?
//     return $http({
//       method: 'GET',
//       url: '/api/getPoems',//TODO:
//     })
//     .then(function (resp) {
//       return resp.data;
//     });
//   };

//   return {
//     getAll: getAll,
//   };
// })