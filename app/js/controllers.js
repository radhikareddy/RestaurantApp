'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function(){

  }])
  .controller('WaitListController', ['$scope','partyService', function($scope, partyService){
  	//$scope.parties to live firebase data
    $scope.parties = partyService.parties; 

  	//Object to store data from waitlist form.
  	$scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};

  	//Function to save a new party to waitlist.
  	$scope.saveParty = function(){
      partyService.saveParty($scope.newParty);
  		// $scope.parties.$add($scope.newParty);
  		$scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
  	};

  	//Function to send a text message to the party
  	$scope.sendTextMessage = function(party){
  		var textMessageRef = new Firebase(FIREBASE_URL + 'textMessages');
  		var textMessages = $firebase(textMessageRef);
  		var newTextMessage = { 
  			phoneNumber: party.phone,
  			size: party.size,
  			name: party.name
  		};
  		textMessages.$add(newTextMessage);

  		//notify code
  		party.notified = 'Yes';
  		$scope.parties.$save(party.$id);
  	};
     
  }])
  .controller('AuthController', ['$scope','authService', function($scope, authService){
  	$scope.user = {email: '', password: ''};

  	$scope.register = function(){
  		authService.register($scope.user);
  	};
  	$scope.login = function(){
        authService.login($scope.user);
  	};
  	$scope.logout = function(){
  		authService.logout();
  	};

}]);