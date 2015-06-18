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

// GET/tales/new

exports.newQuestion= function(req, res){
  var question = models.Question.build(//crea un objeto question
    {pregunta: "pregunta", respuesta:"respuesta"});
  res.render('tales/newquestion', {question: question, errors: []});
};

//POST /tales/create
exports.createQuestion= function (req, res){
var question = models.Question.build(req.body.question);

/*
req.question.validate().then(
  function (err){
    if (err){
      res.render('tales/newquestion', {question: question, errors: err.errors});
    }
*/
var errors= question.validate();

if(errors){
  var i=0;
  var errores= new Array();
  for (var prop in errors)errores[i++]={message: errors[prop]};
    res.render('tales/newquestion', {question: question, errors: errores});
 }
else{
      //guarda DB los campos pregunta y respuesta de question
    question.save({fields: ["pregunta", "respuesta"]}).then(function(){
      res.redirect('/tales/');}
  );

 }
   }

   /*);
};*/

//GET tales/:id/edit
exports.editQuestion = function(req, res){
   var question= req.question;
   res.render('tales/editquestion', {question: question, errors:[]});
}

//PUT /tales/:id

exports.updateQuestion= function(req,res){
  req.question.pregunta =req.body.question.pregunta;
  req.question.respuesta=req.body.question.respuesta;

var question = models.Question.build(req.body.question);
var errors= question.validate();

if(errors){
  var i=0;
  var errores= new Array();
  for (var prop in errors)errores[i++]={message: errors[prop]};
    res.render('tales/editquestion', {question: question, errors: errores});
 }
/*
req.question.validate()
.then(
    function (err){
      if(err){
        res.render('question/editquestion', {question: req.question, errors: err.errors});
      }
*/
 else{
  req.question.save({fields: ["pregunta", "respuesta"]}).then(function(){
    res.redirect('/tales/');});
 }
}
/*
);
};*/