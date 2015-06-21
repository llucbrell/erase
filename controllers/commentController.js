var models = require('../models/models.js');


//GET
exports.newComment= function (req, res){
	res.render('tales/comments/newcomment.ejs', {cuentoId: req.params.cuentoId, errors: []});
};


//POST

exports.createComment = function (req, res){
	var comment = models.Comment.build(
         {texto: req.body.comment.texto, CuentoId: req.params.cuentoId}
		);


var errors= comment.validate();

if(errors){
  var i=0;
  var errores= new Array();
  for (var prop in errors)errores[i++]={message: errors[prop]};
    res.render('comments/newcomment', {comment: comment, cuentoId: req.params.cuentoId, errors: errores});
 }
else{
      //guarda DB los campos pregunta y respuesta de question
    comment.save().then(function(){
      res.redirect('/tales/cuento/'+req.params.cuentoId);}
     );

  }
   








};
