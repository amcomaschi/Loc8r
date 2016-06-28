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

// GET 'home' page
// module.exports.homelist = function (req, res) {
//
// 	var requestOptions, path;
//
// 	path = '/api/locations';
// 	requestOptions = {
// 		url : apiOptions.server + path,
// 		method : "GET",
// 		json : {},
// 		qs : {
// 			lng : -0.969083,
// 			lat : 51.455069,
// 			maxDistance : 30000
// 		}
// 	};
//
// 	request(requestOptions, function (err, response, body) {
// 		var i, data;
// 		data = body;
//
// 		if(response.statusCode === 200 && data.length) {
// 			for (i = 0; i < data.length; i++) {
// 				data[i].distance = _formatDistance(data[i].distance);
// 			}
// 		}
// 		renderHomepage(req, res, data);
// 	})
// };

module.exports.homelist = function(req, res){
	renderHomepage(req, res);
};


var renderHomepage = function(req, res){
	res.render('locations-list', {
		title: 'Loc8r - find a place to work with wifi',
		pageHeader: {
			title: 'Loc8r',
			strapline: 'Find places to work with wifi near you!'
		},
		sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
});
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
	getLocationInfo(req, res, function (req, res, responseData) {
		renderDetailPage(req, res, responseData);
	})
};

var getLocationInfo = function (req, res, callback) {
	var requestOptions, path;
	path = "/api/locations/" + req.params.locationId;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};

	request(requestOptions, function (err, response, body) {
		var data = body;

		if(response.statusCode === 200) {
			console.log(body);
			data.coords = {
				lng: body.coords[0],
				lat: body.coords[1]
			};

			callback(req, res, data);
		} else {
			_showError(req, res, response.statusCode);
		}
	})
}

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
	getLocationInfo(req, res, function (req, res, responseData) {
		renderReviewForm(req, res, responseData);
	})
};

var renderReviewForm = function (req, res, responseData) {
	res.render('location-review-form', { title: 'Opiones de ' + responseData.name + ' en Loc8r',
		pageHeader: {title: responseData.name	},
		error : req.query.err,
		url: req.originalUrl
	});
}

module.exports.doAddReview = function(req, res){
	var requestOptions, path, locationId, postdata;

	locationId = req.params.locationId;
	path = "/api/locations/" + locationId + '/reviews';
	postdata = {
		author : req.body.name,
		rating : parseInt(req.body.rating, 10),
		reviewText : req.body.review
	};

	requestOptions = {
		url : apiOptions.server + path,
		method : 'POST',
		json : postdata
	};

	if (!postdata.author || !postdata.rating || !postdata.reviewText) {
		res.redirect('/location/' + locationId + '/reviews/new?err=val');
	} else {
		request(requestOptions, function (err, response, body) {
			if (response.statusCode === 201) {
				res.redirect('/location/' + locationId);
			} else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
				res.redirect('/location/' + locationId + '/reviews/new?err=val')
			} else {
				_showError(req, res, response.statusCode);
			}
		});
	}
};

var _showError = function (req, res, status) {
	var title, content;
	if (status === 404) {
		title = "404, page not found";
		content = "Oh dear. Looks like we can't find this page. Sorry.";
	} else {
		title = status + ", something's gone wrong";
		content = "Something, somewhere, has gone just a little bit wrong.";
	}
	res.status(status);
	res.render('generic-text', {
		title : title,
		content : content
	});
}