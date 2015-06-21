var path = require('path');

//Postgres DATABASE_URL= postgres://user:passwd@host:port/database
//SQLite   DATABASE_URL= squlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name	 = 	(url[6]|| null);
var user	 = 	(url[2]|| null);
var pwd 	 =	(url[3]|| null);
var protocol = 	(url[1]|| null);
var dialect  =	(url[1]|| null);
var port 	 =	(url[5]|| null);
var host 	 =	(url[4]|| null);
var storage  = 	process.env.DATABASE_STORAGE;

//cargar Modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQlite:
var sequelize = new Sequelize(DB_name, user, pwd,
    {dialect:  protocol,
     protocol: protocol,
     port:     port,
     host:     host,
     storage:  storage,//solo SQlite (.env)
     omitNull: true    //solo Postgres
    }
  );

//importamos la definiciçon de la tabla Question de questions.js
var Question= sequelize.import(path.join(__dirname, 'question'));
var Cuento= sequelize.import(path.join(__dirname, 'cuento'));
var Comment= sequelize.import(path.join(__dirname, 'comment.js'));

Comment.belongsTo(Cuento);
Cuento.hasMany(Comment);

exports.Question = Question;//exportar definición de la tabla Quiz
exports.Cuento = Cuento;//exportamos la otra DB
exports.Comment= Comment;

//creamos e incializamos la tabla de preguntas
sequelize.sync().then(function(){
	//success(..) ejecuta el manejador una vez creada la tabla
	Question.count().then(function (count){
		if (count < 3){//la tabla se inicaliza solo si es vacía
         Question.create({ pregunta: "Autor del Soldadito de Plomo",
                           respuesta: "Andersen",
                           tiempo: 40
                         });
         Question.create({ pregunta: "¿Muere el Soldadito?",
                           respuesta:"Si",
                           tiempo: 35
                         });
         Question.create({ pregunta: "¿Se enamora el Soldadito?",
                           respuesta:"Si",
                           tiempo: 15
                         })
         .then(function(){console.log("Base de datos Question inicializada");});
		}
	});

  Cuento.count().then(function (count){
       if (count < 3){
        Cuento.create({titulo: "Caperucita Roja" , cuento: "Había una vez una niña muy bonita. Su madre le había hecho una capa roja y la muchachita la llevaba tan a menudo que todo el mundo la llamaba Caperucita Roja. Un día, su madre le pidió que llevase unos pasteles a su abuela que vivía al otro lado del bosque, recomendándole que no se entretuviese por el camino, pues cruzar el bosque era muy peligroso, ya que siempre andaba acechando por allí el lobo. Caperucita Roja recogió la cesta con los pasteles y se puso en camino. La niña tenía que atravesar el bosque para llegar a casa de la Abuelita, pero no le daba miedo porque allí siempre se encontraba con muchos amigos: los pájaros, las ardillas... De repente vio al lobo, que era enorme, delante de ella. - ¿A dónde vas, niña?- le preguntó el lobo con su voz ronca.- A casa de mi Abuelita- le dijo Caperucita.- No está lejos- pensó el lobo para sí, dándose media vuelta.  Caperucita puso su cesta en la hierba y se entretuvo cogiendo flores: - El lobo se ha ido -pensó-, no tengo nada que temer. La abuela se pondrá muy contenta cuando le lleve un hermoso ramo de flores además de los pasteles.  Mientras tanto, el lobo se fue a casa de la Abuelita, llamó suavemente a la puerta y la anciana le abrió pensando que era Caperucita. Un cazador que pasaba por allí había observado la llegada del lobo.  El lobo devoró a la Abuelita y se puso el gorro rosa de la desdichada, se metió en la cama y cerró los ojos. No tuvo que esperar mucho, pues Caperucita Roja llegó enseguida, toda contenta.  La niña se acercó a la cama y vio que su abuela estaba muy cambiada.- Abuelita, abuelita, ¡qué ojos más grandes tienes!- Son para verte mejor- dijo el lobo tratando de imitar la voz de la abuela.- Abuelita, abuelita, ¡qué orejas más grandes tienes!- Son para oírte mejor- siguió diciendo el lobo.- Abuelita, abuelita, ¡qué dientes más grandes tienes!- Son para...¡comerte mejoooor!- y diciendo esto, el lobo malvado se abalanzó sobre la niñita y la devoró, lo mismo que había hecho con la abuelita. Mientras tanto, el cazador se había quedado preocupado y creyendo adivinar las malas intenciones del lobo, decidió echar un vistazo a ver si todo iba bien en la casa de la Abuelita. Pidió ayuda a un segador y los dos juntos llegaron al lugar. Vieron la puerta de la casa abierta y al lobo tumbado en la cama, dormido de tan harto que estaba. El cazador sacó su cuchillo y rajó el vientre del lobo. La Abuelita y Caperucita estaban allí, ¡vivas!. Para castigar al lobo malo, el cazador le llenó el vientre de piedras y luego lo volvió a cerrar. Cuando el lobo despertó de su pesado sueño, sintió muchísima sed y se dirigió a un estanque próximo para beber. Como las piedras pesaban mucho, cayó en el estanque de cabeza y se ahogó. En cuanto a Caperucita y su abuela, no sufrieron más que un gran susto, pero Caperucita Roja había aprendido la lección. Prometió a su Abuelita no hablar con ningún desconocido que se encontrara en el camino. De ahora en adelante, seguiría las juiciosas recomendaciones de su Abuelita y de su Mamá."
                     });                    
        Cuento.create({titulo: "La Cenicienta" , cuento: "En el corazón del bosque vivían tres cerditos que "
                     });
        Cuento.create({titulo: "El Gato con Botas" , cuento: "Erase una vez un viejo molinero que tenía tres hijos. Acercándose la hora de su muerte hizo llamar a sus tres hijos. "Mirad, quiero repartiros lo poco que tengo antes de morirme". Al mayor le dejó el molino, al mediano le dejó el burro y al más pequeñito le dejó lo último que le quedaba, el gato. Dicho esto, el padre murió. Mientras los dos hermanos mayores se dedicaron a explotar su herencia, el más pequeño cogió unas de las botas que tenía su padre, se las puso al gato y ambos se fueron a recorrer el mundo. En el camino se sentaron a descansar bajo la sombra de un árbol. Mientras el amo dormía, el gato le quitó una de las bolsas que tenía el amo, la llenó de hierba y dejó la bolsa abierta. En ese momento se acercó un conejo impresionado por el color verde de esa hierba y se metió dentro de la bolsa. El gato tiró de la cuerda que le rodeaba y el conejo quedó atrapado en la bolsa. Se hecho la bolsa a cuestas y se dirigió hacia palacio para entregársela al rey. Vengo de parte de mi amo, el marqués Carrabás, que le manda este obsequio. El rey muy agradecido aceptó la ofrenda. Pasaron los días y el gato seguía mandándole regalos al rey de parte de su amo. Un día, el rey decidió hacer una fiesta en palacio y el gato con botas se enteró de ella y pronto se le ocurrió una idea. "¡Amo, Amo! Sé cómo podemos mejorar nuestras vidas. Tú solo sigue mis instrucciones." El amo no entendía muy bien lo que el gato le pedía, pero no tenía nada que perder, así que aceptó. "¡Rápido, Amo! Quítese la ropa y métase en el río." Se acercaban carruajes reales, era el rey y su hija. En el momento que se acercaban el gato chilló: "¡Socorro! ¡Socorro! ¡El marqués Carrabás se ahoga! ¡Ayuda!". El rey atraído por los chillidos del gato se acercó a ver lo que pasaba. La princesa se quedó asombrada de la belleza del marqués. Se vistió el marqués y se subió a la carroza. El gato con botas, adelantándose siempre a las cosas, corrió a los campos del pueblo y pidió a los del pueblo que dijeran al rey que las campos eran del marqués y así ocurrió. Lo único que le falta a mi amo -dijo el gato- es un castillo, así que se acordó del castillo del ogro y decidió acercarse a hablar con él. "¡Señor Ogro!, me he enterado de los poderes que usted tiene, pero yo no me lo creo así que he venido a ver si es verdad. El ogro enfurecido de la incredulidad del gato, cogió aire y ¡zás! se convirtió en un feroz león. "Muy bien, -dijo el gato- pero eso era fácil, porque tú eres un ogro, casi tan grande como un león. Pero, ¿a que no puedes convertirte en algo pequeño? En una mosca, no, mejor en un ratón, ¿puedes? El ogro sopló y se convirtió en un pequeño ratón y antes de que se diera cuenta ¡zás! el gato se abalanzó sobre él y se lo comió. En ese instante sintió pasar las carrozas y salió a la puerta chillando: "¡Amo, Amo! Vamos, entrad." El rey quedó maravillado de todas las posesiones del marqués y le propuso que se casara con su hija y compartieran reinos. Él aceptó y desde entonces tanto el gato como el marqués vivieron felices y comieron perdices."
                     })
        .then(function(){console.log("Base de datos Cuento inicializada");});     
    }
   });

});