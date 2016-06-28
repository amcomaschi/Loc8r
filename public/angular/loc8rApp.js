/**
 * Created by amcomaschi on 27/06/16.
 */
angular.module('loc8rApp', []);

var isNumeric = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function () {
	return function (distance) {
		console.log(distance)
		var numDistance, unit;

		if (distance && isNumeric(distance)) {
			if (distance > 1) {
				numDistance = parseFloat(distance).toFixed(1);
				unit = 'km';
			} else {
				numDistance = parseInt(distance * 1000, 10);
				unit = 'm';
			}
			return numDistance + unit;
		}
		return 'N/A';
	}
};

var ratingStars = function () {
	return {
		scope: {
			thisRating : '=rating'
		},
		templateUrl : '/angular/rating-stars.html'
	};
};

var locationListCtrl = function ($scope, loc8rData, geolocation) {
	$scope.message = "Buscando tu ubicacion";

	$scope.getData = function (position) {
		var lat = position.coords.latitude,
				lng = position.coords.longitude;

		console.log("Latitud: " + lat + " / Longitud: " + lng);

		$scope.message = "Buscando lugares cerca de tu ubicacion";

		loc8rData.locationByCoords(lat, lng)
			.success(function (data) {
				$scope.message = data.length > 0 ? "" : "No se encontraron lugares cerca tuyo";
				$scope.data = { locations: data };
			})
			.error(function (e) {
				$scope.message = "Ocurrio un error al intentar buscar lugares cerca de tu ubicacion";
				console.log(e);
			});
	};

	$scope.showError = function () {
		$scope.$apply(function () {
			$scope.message = error.message;
		});
	};

	$scope.noGeo = function () {
		$scope.$apply(function () {
			$scope.message = "Tu explorador no soporta la Geolocalizacion";
		})
	};

	geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);

};

var loc8rData = function ($http) {
	var locationByCoords = function (lat, lng) {
		return $http.get('/api/locations?lng=' + lng + '&lat=' + lat +
			'&maxDistance=20000');
	};

	return {
		locationByCoords : locationByCoords
	}
};

var geolocation = function () {
	var getPosition = function (cbSuccess, cbError, cbNoGeo) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
		}
		else {
			cbNoGeo();
		}
	};
	return {
		getPosition :getPosition
	};
};

angular
	.module('loc8rApp')
	.controller('locationListCtrl', locationListCtrl)
	.filter('formatDistance', formatDistance)
	.directive('ratingStars', ratingStars)
	.service('loc8rData', loc8rData)
	.service('geolocation', geolocation);