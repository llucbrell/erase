var models = require('../models/models.js');
//Autoload - factoriza el codigo si ruta incluye :questionId

exports.load = function (req, res, next, questionId){
    models.Question.find(questionId).then(
      function (question){
      if (question) {
         req.question= question;
         next();
      }
      else{ next(new Error('No existe questionId=' + questionId));}
      } ).catch(function (error) { next(error);});
};

exports.loadCuento = function (req, res, next, cuentoId){
    models.Cuento.find(cuentoId).then(
      function (cuento){
      if (cuento) {
         req.cuento= cuento;
         next();
      }
      else{ next(new Error('No existe cuentoId=' + cuentoId));}
      }).catch(function (error) { next(error);});
   
};



// GET/tales/showquestion
exports.showQuestion= function (req, res) {
  res.render('tales/showquestion', {question: req.question});
};

exports.cuentosIndex= function (req, res) {
    models.Cuento.findAll().then(
    function (cuentos){
    res.render('tales/cuentosindex.ejs', {cuentos: cuentos});
    }
   ).catch(function (error){next (error);});
};
//GET tales/cuento

exports.showCuento= function (req, res) {
  res.render('tales/cuento', {cuento: req.cuento});
};


//GET tales/answer

exports.answer= function(req, res) {
  var resultado= 'Incorrecto';
     if(req.query.respuesta === req.question.respuesta){
      resultado='Correcto';
    }
    	res.render('tales/answer',
       { question: req.question, respuesta: resultado});
};


exports.questionIndex = function (req, res){
  if (req.query.search){
    var search= "%"+req.query.search+"%";
    var moreOneWordSearch= search.replace(" ", "%");
    models.Question.findAll({where:["pregunta like ?", moreOneWordSearch]}).then(
       function (questions){
       res.render('tales/index.ejs', {questions: questions});
      }
   ).catch(function (error){next (error);});
  
    }
  else{
    models.Question.findAll().then(
    function (questions){
    res.render('tales/index.ejs', {questions: questions});
    }
   ).catch(function (error){next (error);});

  }
};

//GET autor

exports.autor= function (req, res) {
	res.render('tales/autor');
};

