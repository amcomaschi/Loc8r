/**
 * Created by amcomaschi on 30/06/16.
 */
(function () {
	angular
		.module('loc8rApp')
		.directive('footerGeneric', footerGeneric);

	function footerGeneric () {
		return {
			restrict: 'EA',
			templateUrl: '/common/directives/footerGeneric/footerGeneric.template.html'
	};
	}
})();