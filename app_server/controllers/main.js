/**
 * Created by amcomaschi on 07/06/16.
 */
/* GET home page */
module.exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};