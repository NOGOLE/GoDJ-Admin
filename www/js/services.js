var app = angular.module('godj.services', [])
//Song Factory ---------------------
.factory("Song", function($http) {
	return {
	get: function() {
    var songs = [];
    $http.get('/api/v1/songs').success(function(data){


      songs = data;
  });
  return songs;
},

save: function(songObject) {
        var request = $.post('/api/v1/songs',songObject, function(data) {

return data;
});
	},
	destroy: function(id) {
	return $http.delete('/api/v1/songs/' + id);
}
}

})
// Mood Factory -----------------------------------------------------
.factory("Mood", function($http) {
	return {
	get: function() {
	return $http.get('/api/v1/moods');
	},

	save: function(moodObject) {
	//return $.post('/api/v1/moods',data);
	var request = $.post('/api/v1/moods',moodObject, function(data) {

return data;
});

	},
	destroy: function(id) {
	return $http.delete('/api/v1/moods/' + id);
}
}

})
// Shoutout Factory -----------------------------------------------------
.factory("Shoutout", function($http) {
	return {
	get: function() {
	return $http.get('/api/v1/shoutouts');
	},

	save: function(shoutoutObject) {
	//return $.post('/api/v1/moods',data);
	var request = $.post('/api/v1/shoutouts',shoutoutObject, function(data) {
    console.log(data);


return data;
});

	},
	destroy: function(id) {
	return $http.delete('/api/v1/shoutouts/' + id);
}
}

})
.service('LoginService', function($http){
  this.login = function(email, password) {
		alert(email+password);
    $.post('http://www.godj.nogole.com/api/v1/apilogin', {email:email,password:password},function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
		alert(data);
    if(data.error == false) {

      localStorage.setItem('username',data.username);
      localStorage.setItem('id',data.id)  ;
      //alert(localStorage);
      location.href='#/real-time';
      return true;
    }
    else{
      return false;
    }
  });

};

this.checkLogin = function() {
  if(localStorage.username == null && localStorage.id == null)
  {
        $location.path('/');

  }
  else
  {
    $location.path('/real-time');
    }
};
this.logout = function() {
  localStorage.username = null;
  localStorage.id = null;
  $location.path('/');
};

});
