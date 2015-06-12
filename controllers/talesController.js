// GET/tales/tale

exports.tale= function (req, res) {
   res.render('tales/tale', {title: 'e-rase' , pregunta: '¿Quién escribió el soldadito de plomo?'});

};

//GET tales/answer

exports.answer= function(req, res) {
    if(req.query.respuesta=== 'Andersen'){
    	res.render('tales/answer', {title: 'e-rase' ,respuesta: 'correcto'});
    }
    else{
        res.render('tales/answer', {title: 'e-rase' ,respuesta: 'incorrecto'});
    	
    }
}