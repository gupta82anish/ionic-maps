angular.module('starter').controller('MapCtrl',
	function($rootScope,$scope,$state,$cordovaGeolocation,$http){

		var __serverAddr = 'http://localhost:3000';

		$rootScope._HOSTNAME_ = __serverAddr;


		var options = {timeout: 10000, enableHighAccuracy: true};
	 
	  	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
	 
	    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	    var latitude = position.coords.latitude;
	    var longitude = position.coords.longitude;

	    console.log("latitude:"+latitude);
	    console.log("longitude:"+longitude);

	    var mapOptions = {
	      center: latLng,
	      zoom: 15,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };

	 
	    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

	    
	    google.maps.event.addListenerOnce($scope.map,'idle',function(){
	      var marker = new google.maps.Marker({
	        map:$scope.map,
	        animation: google.maps.Animation.DROP,
	        position: latLng
	      });

	      var infoWindow = new google.maps.InfoWindow({
	        content: "HI"
	      });

	      google.maps.event.addListener(marker,'click',function(){
	        //infoWindow.open($scope.map,marker);
	        console.log("Marker Clicked");
	        $http.post($rootScope._HOSTNAME_ + '/saveCoords',{latitude:latitude,longitude:longitude})
	        .then(function(response){
	        	console.log(response.data);
	        })
	      });

	    })
	  }, function(error){
	    console.log("Could not get location");
	  });
	})