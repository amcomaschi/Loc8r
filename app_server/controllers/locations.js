/**
 * Created by amcomaschi on 09/06/16.
 */
var request = require('request');

var apiOptions = {
	server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production'){
	apiOptions.server = "https://heroku";
}

var renderHomepage = function (req, res, responseBody) {
	console.log('Render homepage with data: ');
	console.log(responseBody);

	var message;
	if(!(responseBody instanceof Array)){
		message = "API lookup error";
		responseBody = [];
	} else{
		if(!responseBody.length){
			message = "No se encontraron lugares cercanos a ti.";
		}
	}

	res.render('locations-list', {  title: 'Loc8r - Encuentra un lugar con wifi para trabajar',
		pageHeader: {
			title: "Loc8r",
			strapline: "Encuentra lugares con wifi cerca tuyo para terminar tu trabajo !"
		},
		sidebar: "Buscar un buen lugar para almorzar, tomar un trago y terminar tu trabajo con la mejor velocidad de conexion.",
		locations: responseBody,
		message: message
	});
}

/* GET 'home' page*/
module.exports.homelist = function (req, res) {

	var requestOptions, path;

	path = '/api/locations';
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {},
		qs : {
			lng : -0.969083,
			lat : 51.455069,
			maxDistance : 30000
		}
	};

	request(requestOptions, function (err, response, body) {
		var i, data;
		data = body;

		if(response.statusCode === 200 && data.length) {
			for (i = 0; i < data.length; i++) {
				data[i].distance = _formatDistance(data[i].distance);
			}
		}
		renderHomepage(req, res, data);
	})
};

var _formatDistance = function (distance) {
	var numDistance, unit;

	if(distance) {
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
};

/* GET 'Location info' page*/
module.exports.locationInfo = function (req, res) {
	var requestOptions, path;
	path = "/api/locations/" + req.params.locationId;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};

	request(requestOptions, function (err, response, body) {
		var data = body;
		data.coords = {
			lng : body.coords[0],
			lat : body.coords[1]
		};

		renderDetailPage(req, res, data);
	})
};

var renderDetailPage = function (req, res, locDetail) {
	console.log("RenderDetailPage");

	res.render('location-info', { title: locDetail.name,
		pageHeader: { title: locDetail.name },
		sidebar: 'Buscar un buen lugar para almorzar, tomar un trago y terminar tu trabajo con la mejor velocidad de conexion.',
		location: locDetail
	});
}

/* GET 'Add review' page */
module.exports.addReview = function (req, res) {
	res.render('location-review-form', { title: 'Opiones de Domenica en Loc8r',
		pageHeader: {title: 'Opinion de Domenica'
		}
	});
};