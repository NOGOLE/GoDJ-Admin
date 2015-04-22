var app = angular.module('godj.controllers',[])
.controller('LoginController',function($scope, LoginService){

  //Scope Variables
  $scope.email = '';
  $scope.password = '';
  //TODO create LoginService
  $scope.login = function() {
    LoginService.login($scope.email, $scope.password);
      //alert("success");





  };

  //check to see if the user is already logged in
LoginService.checkLogin();
})
.controller('RealTimeController', function($scope,LoginService) {
  $scope.songRequests = [];
  $scope.moodRequests = [];
  //hook up Larapush.js code
  $scope.init = function() {

      var larapush = new Larapush('ws://godj.nogole.com:8080');

      larapush.watch(localStorage["username"]).on('song.request', function(msgEvent)
      {
        //debugger;
        var object =JSON.parse(msgEvent.message);
          //console.log(object);
          //alert(object.title);
          $scope.$apply(function(){
            $scope.addSong(object);
          });
          $scope.playSound();


   });

      larapush.watch(localStorage["username"]).on('mood.request', function(msgEvent)
      {//
        //debugger;
  	     var object =JSON.parse(msgEvent.message);
          //console.log(object);
          //alert(object.title);
          $scope.$apply(function(){
            $scope.addMood(object);
          });
          $scope.playSound();


   });
  }
  $scope.addSong = function(object){
          $scope.songRequests.push(object);


  };

  $scope.addMood = function(object) {

      $scope.moodRequests.push(object);

  };

  $scope.deleteSong = function(index){

      $scope.songRequests.splice(index, 1);


  };

  $scope.deleteMood = function(index){

      $scope.moodRequests.splice(index, 1);

  };

  $scope.playSound = function() {
    var soundfile = "pin.mp3";
    document.getElementById("sound").innerHTML="<embed src='"+soundfile+"' hidden=true autostart=true loop=false>";
  };

  $scope.logout = function() {
    LoginService.logout();
  }

  $scope.init();
});
