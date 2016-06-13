/**
 * Created by amcomaschi on 09/06/16.
 */

/* GET 'home' page*/
module.exports.homelist = function (req, res) {
    res.render('locations-list', {  title: 'Loc8r - Encuentra un lugar con wifi para trabajar',
                                    pageHeader: {
                                        title: "Loc8r",
                                        strapline: "Encuentra lugares con wifi cerca tuyo para terminar tu trabajo !"
                                    },
                                    sidebar: "Buscar un buen lugar para almorzar y tomar un trago, venite a Domenica. Contamos con una " +
                                              "conexion super rapida.",
                                    locations: [{
                                        name: "Domenica",
                                        address: "San Juan 2552, Capital Federal",
                                        rating: 3,
                                        facilities: ['Tragos', 'Pizzas', 'Wifi'],
                                        distance: '100m'
                                    },{
                                        name: "Pausa",
                                        address: "Jujuy 1245, Capital Federal",
                                        rating: 2,
                                        facilities: ['Cervezas', 'Minutas', 'Wifi'],
                                        distance: '90m'
                                    },{
                                        name: "Burguer King",
                                        address: "San Juan 2340, Capital Federal",
                                        rating: 4,
                                        facilities: ['Hamburguesas', 'Wifi'],
                                        distance: '250m'
                                    }]
    });
};

/* GET 'Location info' page*/
module.exports.locationInfo = function (req, res) {
    res.render('location-info', { title: 'Domenica',
                                  pageHeader: {title: 'Domenica'},
                                  sidebar: 'dddddddddddddddddd',
                                  location: {
                                    name: 'Domenica',
                                    address: 'San Juan 2552, Capital Federal',
                                    rating: 4,
                                    facilities: ['Cerveza', 'Pizzas', 'Wifi'],
                                    coords: {lat: -34.623832, long: -58.4036347},
                                    openingTimes: ['Lunes a Viernes : 09:00 am - 11:00 pm', 'Sabados : 10:00 am - 11:00 pm', 'Domingos : cerrado'],
                                    reviews: [{author: 'Adrian Kamycki',
                                              rating: 3,
                                              timestap: '10/05/2016',
                                              reviewText: 'Que buen lugar !'}]
                                  }
                                });
};

/* GET 'Add review' page */
module.exports.addReview = function (req, res) {
    res.render('location-review-form', { title: 'Add review'});
};