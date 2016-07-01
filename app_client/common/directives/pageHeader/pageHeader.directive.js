/**
 * Created by amcomaschi on 30/06/16.
 */
(function () {
	angular
		.module('loc8rApp')
		.directive('pageHeader', pageHeader);

	function pageHeader() {
		return {
			restrict: 'EA',
			scope: {
				content: '=content'
			},
			templateUrl: '/common/directives/pageHeader/pageHeader.template.html'
		};
	}
})();