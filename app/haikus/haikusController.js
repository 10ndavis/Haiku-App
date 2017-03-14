

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


  $scope.postPoem = function(name, lineOne, lineTwo, lineThree){
    var poem = lineOne + "\n" + lineTwo + "\n" + lineThree;
      $http({
        url: '/postPoem',
        method: 'POST',
        data: {"name": name, "poem": poem}
      })
  }

  $scope.checkLegalFive = function(line){
    if(checkSent(line) !== 5){
      $('#lineone').css("background", "rgba(244, 66, 66, 0.3)")
    } else {
      $('#lineone').css("background", "none")
    }
}

  $scope.checkLegalSeven = function(line){
    if(checkSent(line) !== 7){
      $('#linetwo').css("background", "rgba(244, 66, 66, 0.3)")
    } else {
      $('#linetwo').css("background", "none")
    }
  }

  $scope.checkLegalSevenTwo = function(line){
    if(checkSent(line) !== 5){
      $('#linethree').css("background", "rgba(244, 66, 66, 0.3)")
    } else {
      $('#linethree').css("background", "none")
    }
  }



    function checkSent(sentence){
      var splitSent = sentence.split(" ");
      var result = 0;
      splitSent.forEach(function(word){
        result = result + sylCheck(word);
      })
      return result;
    }


    function sylCheck(word) {
      word = word.toLowerCase();
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      return word.match(/[aeiouy]{1,2}/g).length;
    }
});

