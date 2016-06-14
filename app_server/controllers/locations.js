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