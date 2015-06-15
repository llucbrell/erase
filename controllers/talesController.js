var models = require('../models/models.js')

// GET/tales/tale
exports.tale= function (req, res) {
  models.Question.findAll().success(function (question){
   res.render('tales/tale', {pregunta: question[0].pregunta});
  })
};

exports.cuento= function (req, res) {
   res.render('tales/cuento', {titulo: "El Soldadito de plomo" , cuento: "Éranse una vez veinticinco soldados de plomo, todos hermanos, pues los habían fundido de una misma cuchara vieja. Llevaban el fusil al hombro y miraban de frente; el uniforme era precioso, rojo y azul. La primera palabra que escucharon en cuanto se levantó la tapa de la caja que los contenía fue: «¡Soldados de plomo!». La pronunció un chiquillo, dando una gran palmada. Eran el regalo de su cumpleaños, y los alineó sobre la mesa. Todos eran exactamente iguales, excepto uno, que se distinguía un poquito de los demás: le faltaba una pierna, pues había sido fundido el último, y el plomo no bastaba. Pero con una pierna, se sostenía tan firme como los otros con dos, y de él precisamente vamos a hablar aquí. En la mesa donde los colocaron había otros muchos juguetes, y entre ellos destacaba un bonito castillo de papel, por cuyas ventanas se veían las salas interiores. Enfrente, unos arbolitos rodeaban un espejo que semejaba un lago, en el cual flotaban y se reflejaban unos cisnes de cera. Todo era en extremo primoroso, pero lo más lindo era una muchachita que estaba en la puerta del castillo. De papel también ella, llevaba un hermoso vestido y una estrecha banda azul en los hombros, a modo de fajín, con una reluciente estrella de oropel en el centro, tan grande como su cara. La chiquilla tenía los brazos extendidos, pues era una bailarina, y una pierna levantada, tanto, qué el soldado de plomo, no alcanzando a descubrirla, acabó por creer que sólo tenía una, como él. «He aquí la mujer que necesito -pensó-. Pero está muy alta para mí: vive en un palacio, y yo por toda vivienda sólo tengo una caja, y además somos veinticinco los que vivimos en ella; no es lugar para una princesa. Sin embargo, intentaré establecer relaciones». Todo iluminado y sintió un calor espantoso, aunque no sabía si era debido al fuego o al amor. Sus colores se habían borrado también, a consecuencia del viaje o por la pena que sentía; nadie habría podido decirlo. Miró de nuevo a la muchacha, encontráronse las miradas de los dos, y él sintió que se derretía, pero siguió firme, arma al hombro. Abrióse la puerta, y una ráfaga de viento se llevó a la bailarina, que, cual una sílfide, se levantó volando para posarse también en la chimenea, junto al soldado; se inflamó y desapareció en un instante. A su vez, el soldadito se fundió, quedando reducido a una pequeña masa informe. Cuando, al día siguiente, la criada sacó las cenizas de la estufa, no quedaba de él más que un trocito de plomo en forma de corazón; de la bailarina, en cambio, había quedado la estrella de oropel, carbonizada y negra."});

};

//GET tales/answer

exports.answer= function(req, res) {
  models.Question.findAll().success(function (question){
    if(req.query.respuesta=== question[0].respuesta){
    	res.render('tales/answer', {respuesta: 'correcto'});
    }
    else{
        res.render('tales/answer', {respuesta: 'incorrecto'});
    	
    }
  })
}


//GET autor

exports.autor= function (req, res) {
	res.render('tales/autor');
}