/**
 * Created by amcomaschi on 30/06/16.
 */
(function () {
	angular
		.module('loc8rApp')
		.directive('navigation', navigation);
	
	function navigation () {
		return {
			restrict: 'EA',
			templateUrl: '/common/directives/navigation/navigation.template.html',
			controller: 'navigationCtrl as navvm'
		};
	}
})();