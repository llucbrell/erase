var express = require('express');
var router = express.Router();

//add controller
var talesController= require('../controllers/talesController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index1', { title: 'e-rase' });
});

//carga los datos de la base de datos en el request
//y los envía al siguiente middleware... si hay un error
//es gestionado desde este middleware
router.param('questionId', talesController.load);
router.param('cuentoId', talesController.loadCuento);


//definición de rutas
router.get('/autor', talesController.autor);
router.get('/tales/cuentosindex', talesController.cuentosIndex);

//para manejo de questionsDB
router.get('/tales/',                            talesController.questionIndex);
router.get('/tales/:questionId(\\d+)',           talesController.showQuestion);
router.get('/tales/:questionId(\\d+)/answer',    talesController.answer);

//para manejo cuentosDB
router.get('/tales/cuento/:cuentoId(\\d+)', talesController.showCuento);


module.exports = router;
