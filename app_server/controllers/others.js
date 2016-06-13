/**
 * Created by amcomaschi on 09/06/16.
 */

/* GET 'about' page */
module.exports.about = function (req, res) {
    res.render('generic-text', { title: 'About' });
};