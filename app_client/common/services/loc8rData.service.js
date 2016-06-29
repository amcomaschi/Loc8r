/**
 * Created by amcomaschi on 29/06/16.
 */

(function () {
	angular
		.module('loc8rApp')
		.service('loc8rData', loc8rData);


	loc8rData.$inject = ['$http'];
	function loc8rData ($http) {
		var locationByCoords = function (lat, lng) {
			return $http.get('/api/locations?lng=' + lng + '&lat=' + lat +
				'&maxDistance=200000');
		};
		return {
			locationByCoords : locationByCoords
		};
	}

})();	