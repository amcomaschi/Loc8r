/**
 * Created by amcomaschi on 09/06/16.
 */

/* GET 'about' page */
module.exports.about = function (req, res) {
    res.render('generic-text', { title: 'About',
                                content: 'Loc8r fue creado para ayudar a la gente a encontrar lugares en donde poder sentarse a terminar su trabajo.'});
};

module.exports.angularApp = function(req, res){
  res.render('layout', { title : 'Loc8r'});
}