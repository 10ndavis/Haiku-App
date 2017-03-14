//var syllable = require('syllable');

var app = angular.module('myApp', []);
app.controller('haikuCtrl', function($scope, $interval, $http) {

    $interval(getPoems, 3000);



    // $scope.poems = [ //this is where the data from the get request will go
    //   {name: 'John Smith', poem: 'test poem'},
    //   {name: 'Nathan Brewer-Davis', poem: 'test poem 2'}
    // ];


  //TODO: make server render information upon request,
  //have it re-render when the data is pulled

  function getPoems(){

    return $http({
        method: 'GET',
        url: '/getPoems',//TODO:
      })
      .then(function (resp) {
        //console.log(resp.data); //data is coming back blank
        $scope.poems = resp.data;
      });
    }


  $scope.postPoem = function(name, poem){
      $http({
        url: '/postPoem',
        method: 'POST',
        data: {"name": name, "poem": poem}
      })
  }




});

