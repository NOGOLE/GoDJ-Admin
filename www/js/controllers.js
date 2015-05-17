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
//polar chart---------------------------------------
var data = [
    {
        value: 0,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Song Requests"
    },
    {
        value: 0,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Mood Requests"
    }
];
var polar = document.getElementById("polarchart").getContext("2d");
var myPolarChart = new Chart(polar).PolarArea(data);
//chart-----------------------------------------------




var data = {
    labels: ["Song Requests", "Mood Requests"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(0,0,0,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0,0]
        },
    ]
};
    var ctx = document.getElementById("radarchart").getContext("2d");

    var myRadarChart = new Chart(ctx).Radar(data);


console.log(myRadarChart);
//end chart------------------------------------------


      var larapush = new Larapush('ws://godj.nogole.com:8080');

      larapush.watch(localStorage["username"]).on('song.request', function(msgEvent)
      {
        var object =JSON.parse(msgEvent.message);
          $scope.$apply(function(){
            $scope.addSong(object);
          });
          //Update Charts
	      myRadarChart.datasets[0].points[0].value += 1;
        myRadarChart.update();
	      myPolarChart.segments[0].value += 1;
        myPolarChart.update();


   });

      larapush.watch(localStorage["username"]).on('mood.request', function(msgEvent)
      {//
  	     var object =JSON.parse(msgEvent.message);
          $scope.$apply(function(){
            $scope.addMood(object);
          });
          //Update Charts
	     myPolarChart.segments[1].value += 1;
       myPolarChart.update();
	     myRadarChart.datasets[0].points[1].value += 1;
       myRadarChart.update();

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
  $scope.logout = function() {
    LoginService.logout();
  }

  $scope.init();
});
