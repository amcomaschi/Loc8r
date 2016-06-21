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
		sidebar: "Buscar un buen lugar para almorzar y tomar un trago, venite a Domenica. Contamos con una " +
		"conexion super rapida.",
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
			maxDistance : 30
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
	res.render('location-info', { title: 'Domenica',
		pageHeader: { title: 'Domenica' },
		sidebar: 'dddddddddddddddddd',
		location: {
			name: 'Domenica',
			address: 'San Juan 2552, Capital Federal',
			facilities: ['Cerveza', 'Pizzas', 'Wifi'],
			coords: {lat: -34.623832, long: -58.4036347},
			openingTimes: [{
				days: 'Lunes - Viernes',
				opening: '08:00 am',
				closing: '11:00 pm',
				closed: false
			},{
				days: 'Sabado',
				opening: '10:00 am',
				closing: '10:00 pm',
				closed: false
			},{
				days: 'Domingo',
				closed: true
			}],
			reviews: [{
				author: 'Adrian Kamycki',
				rating: 4,
				timestamp: '10/05/2016',
				reviewText: 'Que buen lugar !'
			},{
				author: 'Ariel Comaschi',
				rating: 3,
				timestamp: '22/05/2016',
				reviewText: 'Me bueno el lugar, pero caro !'
			}]
		}
	});
};

/* GET 'Add review' page */
module.exports.addReview = function (req, res) {
	res.render('location-review-form', { title: 'Opiones de Domenica en Loc8r',
		pageHeader: {title: 'Opinion de Domenica'
		}
	});
};