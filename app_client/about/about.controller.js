/**
 * Created by amcomaschi on 30/06/16.
 */

(function () {
	angular
		.module('loc8rApp')
		.controller('aboutCtrl', aboutCtrl);

	function aboutCtrl() {
		var vm = this;
		vm.pageHeader = {
			title: 'About Loc8r',
		};
		vm.main = {
			content: 'Loc8r fue creado para ayudar a la gente a encontrar lugares en donde poder sentarse a terminar su trabajo.'
	};
	}
})();
