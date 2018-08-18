var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cool, huh!', condition: false });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Cool, huh!', condition: false });
});

/* GET user page. */
router.get('/user/login', function(req, res, next) {
    res.render('./user/login');
});

router.get('/user/signup', function(req, res, next) {
  res.render('./user/signup');
});

// router.get('/:productID', function(req, res, next) {
//   res.render('./products/product');
// });


module.exports = router;
