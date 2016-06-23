/**
 * Created by amcomaschi on 23/06/16.
 */
$('#addReview').submit(function (e) {
	$('.alert.alert-danger').hide();
	if (!$('input#name').val() || !$('select#rating').val() ||
		!$('textarea#review').val()) {

		if ($('.alert.alert-danger').length) {
			$('.alert.alert-danger').show();
		} else {
			$(this).prepend('<div role="alert" class="alert alert-danger">Todos los campos son requeridos, por favor intentar nuevamente.</div>');
		}
		return false;
	}
});