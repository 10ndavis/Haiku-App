

var app = angular.module('myApp', []);
app.controller('haikuCtrl', function($scope, $interval, $http) {

    $interval(getPoems, 500);



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
    if(name === undefined || null){
      name = "Anon"
    }
    var poem = lineOne + "\n" + lineTwo + "\n" + lineThree;
      $http({
        url: '/postPoem',
        method: 'POST',
        data: {"name": name, "poem": poem}
      })
  }


  $("document").ready(function(){
      $("#submitPoemButton").on("click", function() {
        if ($(".textField").val() !== ""){
          $(".textField").val("")
        }
      })

      $("#authortextField").on("click", function() {
        if ($(".textField").val() !== ""){
          $(".textField").val("")
        }
      })
  })




  $scope.checkLegalFive = function(line){
    if(checkSent(line) !== 5){
      $('#lineone').css("background", "rgba(244, 66, 66, 0.75)")
      $('#submitPoemButton').prop('disabled', true);
    } else {
      $('#lineone').css("background", "white")
      $('#submitPoemButton').prop('disabled', false);
    }
}

  $scope.checkLegalSeven = function(line){
    if(checkSent(line) !== 7){
      $('#linetwo').css("background", "rgba(244, 66, 66, 0.75)")
      $('#submitPoemButton').prop('disabled', true);
    } else {
      $('#linetwo').css("background", "white")
      $('#submitPoemButton').prop('disabled', false);
    }
  }

  $scope.checkLegalSevenTwo = function(line){
    if(checkSent(line) !== 5){
      $('#linethree').css("background", "rgba(244, 66, 66, 0.75)")
      $('#submitPoemButton').prop('disabled', true);
    } else {
      $('#linethree').css("background", "white")
      $('#submitPoemButton').prop('disabled', false);
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

