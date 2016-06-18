/**
 * Created by ariel on 16/06/16.
 */

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsCreate = function (req, res) {
    var 
};

module.exports.reviewsReadOne = function (req, res) {
    if(req.params && req.params.locationId && req.params.reviewId) {
        Loc
            .findById(req.params.locationId)
            .select('name reviews')
            .exec(function (err, location) {
                var response, review;
                if(!location){
                    sendJsonResponse(res, 404, {
                        "message": "locationId not found"
                    });
                    return;
                } else if (err){
                    sendJsonResponse(res, 404, err);
                    return;
                }
                if(location.reviews && location.reviews.length > 0){
                    review = location.reviews.id(req.params.reviewId);
                    if(!review){
                        sendJsonResponse(res, 404, {
                            "message": "reviweId not found"
                        });
                    } else{
                        response = {
                            location: {
                                name: location.name,
                                id: req.params.locationId
                            },
                            review: review
                        };
                        sendJsonResponse(res, 200, response);
                    }
                } else{
                    sendJsonResponse(res, 404, {
                        "message": "No reviews found"
                    });
                }
            });
    } else{
        sendJsonResponse(res, 404, {
            "message": "Not found, locationid and reviewid are both required"
        });
    }
};

module.exports.reviewsUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success"});
};

module.exports.reviewsDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, { "status": "success"});
};