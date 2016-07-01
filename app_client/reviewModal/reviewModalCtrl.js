/**
 * Created by amcomaschi on 01/07/16.
 */
(function () {
	
	angular
		.module('loc8rApp')
		.controller('reviewModalCtrl', reviewModalCtrl);

	reviewModalCtrl.$inject = ['$uibModalInstance', 'loc8rData', 'locationData'];
	function reviewModalCtrl($uibModalInstance, loc8rData, locationData) {
		var vm = this;
		vm.locationData = locationData;

		vm.onSubmit = function () {
			vm.formError = "";

			if(!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
				vm.formError = "Todos los campos son requeridos, por favor completarlos";
				return false;
			} else {
				console.log("FormData: " + vm.formData);
				vm.doAddReview(vm.locationData.locationId, vm.formData);
			}
		};

		vm.doAddReview = function (locationId, formData) {

			console.log("DoAddReview - Name:" + formData.name  + " rating: " + formData.rating + " ReviewText:" + formData.reviewText);

			loc8rData.addReviewById(locationId, {
				author : formData.name,
				rating : formData.rating,
				reviewText : formData.reviewText
			})
				.success(function (data) {
					console.log("Success!");
					vm.modal.close(data);
				})
				.error(function (data) {
					vm.formError = "No se pudo guardar tu reseña, por favor intenta nuevamente.";
					console.log(data);
				});
			return false;
		};

		vm.modal = {
			close : function (result) {
				$uibModalInstance.close(result);
			},
			cancel : function(){
				$uibModalInstance.dismiss('cancel');
			}
		};

	}
})();