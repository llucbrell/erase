var express = require('express');
var router = express.Router();

//add controller
var talesController= require('../controllers/talesController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'e-rase' });
});



//definición de rutas
router.get('/autor', talesController.autor);
router.get('/tales/cuento', talesController.cuento);

//para manejo de DB
router.get('/tales/',                            talesController.questionIndex);
router.get('/tales/:questionId(\\d+)',           talesController.showQuestion);
router.get('/tales/:questionId(\\d+)/answer',    talesController.answer);

module.exports = router;
