var app = angular.module('godj.services', [])
//Song Factory ---------------------
.factory("Song", function($http) {
	return {
	get: function() {
    var songs = [];
    $http.get('http://www.godj.nogole.com/api/v1/songs').success(function(data){


      songs = data;
  });
  return songs;
},

save: function(songObject) {
        var request = $.post('http://www.godj.nogole.com/api/v1/songs',songObject, function(data) {

return data;
});
	},
	destroy: function(id) {
	return $http.delete('http://www.godj.nogole.com/api/v1/songs/' + id);
}
}

})
// Mood Factory -----------------------------------------------------
.factory("Mood", function($http) {
	return {
	get: function() {
	return $http.get('http://www.godj.nogole.com/api/v1/moods');
	},

	save: function(moodObject) {
	//return $.post('http://www.godj.nogole.com/api/v1/moods',data);
	var request = $.post('http://www.godj.nogole.com/api/v1/moods',moodObject, function(data) {

return data;
});

	},
	destroy: function(id) {
	return $http.delete('http://www.godj.nogole.com/api/v1/moods/' + id);
}
}

})
// Shoutout Factory -----------------------------------------------------
.factory("Shoutout", function($http) {
	return {
	get: function() {
	return $http.get('http://www.godj.nogole.com/api/v1/shoutouts');
	},

	save: function(shoutoutObject) {
	//return $.post('http://www.godj.nogole.com/api/v1/moods',data);
	var request = $.post('http://www.godj.nogole.com/api/v1/shoutouts',shoutoutObject, function(data) {
    console.log(data);


return data;
});

	},
	destroy: function(id) {
	return $http.delete('http://www.godj.nogole.com/api/v1/shoutouts/' + id);
}
}

})
.factory('AuthService', function($http){
	return {
		login: function(userObject) {
			return $http.post('http://www.godj.nogole.com/api/v1/apilogin',userObject);
		},
		logout: function() {
			localStorage.id = null;
			localStorage.username = null;
		},
		register: function(userObject){
			return $http.post('http://www.godj.nogole.com/api/v1/users',userObject);
		},
		checkLogin: function(){
			if(localStorage.id == null || localStorage.username == null){
				return false;
			}
			else return true;
		}
	}

});
