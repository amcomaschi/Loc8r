/**
 * Created by amcomaschi on 30/06/16.
 */

(function () {
	angular
		.module('loc8rApp')
		.controller('locationDetailCtrl', locationDetailCtrl);

	locationDetailCtrl.$inject = ['$routeParams', 'loc8rData', '$uibModal'];
	function locationDetailCtrl ($routeParams, loc8rData, $uibModal) {
		var vm = this;
		vm.locationid = $routeParams.locationId;
		console.log("LocationId controller: " + $routeParams.locationId);

		loc8rData.locationById(vm.locationid)
			.success(function (data) {
				vm.data = { location : data };
				vm.pageHeader = { title: vm.data.location.name };
			})
			.error(function (e) {
				console.log(e);
			});

		vm.popupReviewForm = function () {
			var modalInstance = $uibModal.open({
				templateUrl: '/reviewModal/reviewModal.view.html',
				controller: 'reviewModalCtrl as vm',
				resolve:{
					locationData : function () {
						return {
							locationId : vm.locationid,
							locationName : vm.data.location.name
						};
					}
				}
			});

			modalInstance.result.then(function (data) {
				vm.data.location.reviews.push(data);
			});
		};
	}
})();
