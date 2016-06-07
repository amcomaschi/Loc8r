var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', homepageController});

homepageController = function (req, res) {
  res.render('index' { title: 'Express'});
}

module.exports = router;
