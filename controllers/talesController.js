// GET/tales/tale

exports.tale= function (req, res) {
   res.render('tales/tale', {pregunta: '¿Quién escribió el soldadito de plomo?'});

};

//GET tales/answer

exports.answer= function(req, res) {
    if(req.query.respuesta=== 'Andersen'){
    	res.render('tales/answer', {respuesta: 'correcto'});
    }
    else{
        res.render('tales/answer', {respuesta: 'incorrecto'});
    	
    }
}


//GET autor

exports.autor= function (req, res) {
	res.render('tales/autor');
}