var express = require('express');
var router = express.Router();

//add controller
var talesController= require('../controllers/talesController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'e-rase' });
});

router.get('/tales/tale', talesController.tale);
router.get('/tales/answer', talesController.answer);
router.get('/autor', talesController.autor);
router.get('/tales/cuento', talesController.cuento);

module.exports = router;
