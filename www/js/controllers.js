var app = angular.module('godj.controllers',[])
.controller('LoginController',function($scope, AuthService,$location){

  //Scope Variables
  $scope.email = '';
  $scope.password = '';
  //TODO create AuthService
  $scope.login = function() {

    AuthService.login({email:$scope.email,password:$scope.password} ).success(function(data){

      localStorage.id = data.id;
      localStorage.username = data.username;
      console.log(data);
      $location.path('/real-time');
    });
      //alert("success");





  };

  //check to see if the user is already logged in
if(AuthService.checkLogin()==false) {
  $location.path('/real-time');
}
})
.controller('RealTimeController', function($scope,$http,Mood,Song,Shoutout,AuthService,$cordovaVibration,$location) {
  //$scope.requests = [['Lat','Long','Name'],[0,0,'Test']];
  $scope.url = 'ws://godj.nogole.com:8080';
  $scope.songRequests = [];
  $scope.moodRequests = [];
  var ping = new Audio('sounds/pinger2.mp3');
  //delete songs
  $scope.deleteSong = function($index) {
  Song.destroy($scope.songRequests[$index].id);
  $scope.songRequests.splice($index,1);
  $scope.myRadarChart.datasets[0].points[0].value -= 1;
  $scope.myRadarChart.update();
  $scope.myPolarChart.segments[0].value -= 1;
  $scope.myPolarChart.update();
  };
  //delete moods
  $scope.deleteMood = function($index) {
  Mood.destroy($scope.moodRequests[$index].id);
  $scope.moodRequests.splice($index,1);
  $scope.myPolarChart.segments[1].value -= 1;
  // Would update the first dataset's value of 'Green' to be 10
  $scope.myPolarChart.update();
  $scope.myRadarChart.datasets[0].points[1].value -= 1;
  $scope.myRadarChart.update();
  };
/*
  $scope.submitParty = function(id) {
  var stime = $scope.party_start_time;
  var etime = $scope.party_end_time;

  console.log(stime);
  console.log(etime);
  var partyObject = {id:id, name: $scope.party_name, address:$scope.party_address,
  city:$scope.party_city,state:$scope.party_state,zip:$scope.party_zip,start_time:$scope.party_start_time,end_time:$scope.party_end_time};
  $.post('http://www.godj.nogole.com/api/v1/parties',partyObject,function(data){
  console.log(data);
  });
  };
  */
  //initialize function
  $scope.init = function(channel){
    $scope.polarData;
    $scope.radarData;


     $http.get('http://www.godj.nogole.com/api/v1/songs').success(function(data){
       $scope.songRequests = data;
       $http.get('http://www.godj.nogole.com/api/v1/moods').success(function(data){
         $scope.moodRequests = data;
         console.log($scope.totalRequests);
         $scope.polarData = [
             {
                 value: $scope.songRequests.length,
                 color:"#F7464A",
                 highlight: "#FF5A5E",
                 label: "Song Requests"
             },
             {
                 value: $scope.moodRequests.length,
                 color: "#46BFBD",
                 highlight: "#5AD3D1",
                 label: "Mood Requests"
             }
         ];

         $scope.radarData = {
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
                    data: [$scope.songRequests.length,$scope.moodRequests.length]
                },
            ]
        };
        var polar = document.getElementById("polarchart").getContext("2d");
        $scope.myPolarChart = new Chart(polar).PolarArea($scope.polarData);
        //chart-----------------------------------------------

            var ctx = document.getElementById("radarchart").getContext("2d");

           $scope.myRadarChart = new Chart(ctx).Radar($scope.radarData);



        //console.log(myRadarChart);
        //end chart------------------------------------------
            var larapush = new Larapush($scope.url);
            console.log(larapush);
            //TODO make dynamic
            larapush.watch(channel).on('song.request', function(msgEvent)
            {
              ping.play();
              // Vibrate 100ms
              $cordovaVibration.vibrate(100);
              var myData = JSON.parse(msgEvent.message);
              console.log(myData);
              $scope.$apply(function(){
              $scope.songRequests.push(myData);
              $scope.totalRequests = $scope.songRequests.length + $scope.moodRequests.length;
              });


          $scope.myRadarChart.datasets[0].points[0].value += 1;

                $scope.myRadarChart.update();

          $scope.myPolarChart.segments[0].value += 1;
        // Would update the first dataset's value of 'Green' to be 10
          $scope.myPolarChart.update();
            });
            larapush.watch(channel).on('mood.request', function(msgEvent)
            {
              ping.play();
              // Vibrate 100ms
              $cordovaVibration.vibrate(500);
          var myData = JSON.parse(msgEvent.message);
              console.log(msgEvent.message);
              $scope.$apply(function(){
              $scope.moodRequests.push(myData);
              $scope.totalRequests = $scope.songRequests.length + $scope.moodRequests.length;
          $scope.myPolarChart.segments[1].value += 1;
        // Would update the first dataset's value of 'Green' to be 10
        $scope.myPolarChart.update();

        $scope.myRadarChart.datasets[0].points[1].value += 1;

        $scope.myRadarChart.update();

              });
        //console.log(channel);
            });

       });


     });


  };
$scope.logout = function(){
  AuthService.logout();
  $location.path('/');
}
  $scope.totalRequests = $scope.songRequests.length + $scope.moodRequests.length;
  $scope.init(localStorage.username);


});
