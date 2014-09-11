'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('FIREBASE_URL', 'https://wait-and-eat-radhika.firebaseio.com/')
  .factory('authService', function($firebaseSimpleLogin,$location, FIREBASE_URL){
  	var authRef = new Firebase(FIREBASE_URL);
  	var auth = $firebaseSimpleLogin(authRef);
  	var authServiceObject = {
  		register: function(user){
  			auth.$createUser(user.email, user.password).then(function(data){
  			console.log(data);
  			authServiceObject.login(user);
  		});

  		},
  		login: function(user){
  		auth.$login('password', user).then(function(data){
        	console.log(data);
        	//Redirect users to /waitlist
        	$location.path('/waitlist');
        });
        },
        logout: function(){
        	auth.$logout();
  		    $location.path('/');
        }
  	};
  	return authServiceObject;
  });