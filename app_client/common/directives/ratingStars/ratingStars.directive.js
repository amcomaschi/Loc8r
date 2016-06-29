/**
 * Created by amcomaschi on 29/06/16.
 */

(function () {
	angular
		.module('loc8rApp')
		.directive('ratingStars', ratingStars);
	
	
	function ratingStars () {
		return {
			restrict: 'EA',
			scope: {
				thisRating : '=rating'
			},
			templateUrl: '/common/directives/ratingStars/ratingStars.template.html'
		};
	}
})();	