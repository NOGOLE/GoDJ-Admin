var app = angular.module('godj.services', [])
.service('LoginService', function($http){
  this.login = function(email, password) {
    $http.post('http://www.godj.nogole.com/api/v1/apilogin', {email:email,password:password})
    .success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    if(data.error == false) {

      localStorage.setItem('username',data.username);
      localStorage.setItem('id',data.id)  ;
      //alert(localStorage);
      location.href = '#/real-time';
      return true;
    }
    else{
      return false;
    }
  })
  .error(function(data, status, headers, config) {
    return false;
  });

};

this.checkLogin = function() {
  if(localStorage.username == '' && localStorage.id == '')
  {
    return false;
  }
  else
  {
    location.href = '#/real-time';
    return true;
    }
};
this.logout = function() {
  localStorage["username"] = '';
  localStorage["id"] = '';
  location.href = "#/";
};

});
