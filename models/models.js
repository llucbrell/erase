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

exports.Question = Question;//exportar definición de la tabla Quiz
exports.Cuento = Cuento;//exportamos la otra DB

//creamos e incializamos la tabla de preguntas
sequelize.sync().then(function(){
	//success(..) ejecuta el manejador una vez creada la tabla
	Question.count().then(function (count){
		if (count < 3){//la tabla se inicaliza solo si es vacía
         Question.create({ pregunta: "Autor del Soldadito de Plomo",
                           respuesta: "Andersen"
                         });
         Question.create({ pregunta: "¿Muere el Soldadito?",
                           respuesta:"Si"
                         });
         Question.create({ pregunta: "¿Se enamora el Soldadito?",
                           respuesta:"Si"
                         })
         .then(function(){console.log("Base de datos Question inicializada");});
		}
	});

  Cuento.count().then(function (count){
       if (count < 7){
        Cuento.create({titulo: "El libro de la selva completo" , cuento: "Este es el cuento de un niño a quien Bagheera, la pantera negra, se encontró en la selva. Bagheera llevó al niño con unos lobos amigos quienes lo criaron como su propio hijo y lo llamaron Mowgli.Mowgli aprendió a vivir en la selva, pero siempre cuidado de cerca por su protector y amigo Bagheera. Los elefantes también se hicieron amigos, aun el coronel Hathi, un elefante gruñón que era el jefe y que todas las mañanas, dictando órdenes, los hacía marchar.No todos en la selva eran amistosos. Kaa, la boa hambrienta, ¡Quería comerse a Mowgli! Los de ojos Kaa hipnotizaban a cualquiera, y hacían pedazos al que apretaba entre sus anillos. Pero Mowgli tenía un enemigo más peligroso, Shere Khan, el tigre, quien estaba empeñado en matarlo antes de que Mowgli llegara a ser hombre.El capitán de la manada de lobos decidió que sólo había una forma de salvar al chico. – “Este niño debe ser llevado a la aldea del hombre”- dijo. Y Bagheera estuvo de acuerdo en llevarlo hasta la aldea.Mowgli pensó que Bagheera sólo lo llevaba a dar un paseo pero cuando le dijo a dónde lo llevaba, Mowgli gritó enojada –“¡No iré! ¡Quiero quedarme en la selva!”-.El chico huyó y se internó solo en el bosque en donde, al poco se hizo amigo de un oso alegre y vagabundo llamado Baloo. Baloo invitó al niño a nadar en el río y mientras el oso flotaba sobre su ancha espalda, Mowgli iba montado cómodamente sobre la panza de su amigo.De pronto, Mowgli sintió que alguien lo elevaba por los aires. Era una pandilla de pícaros monos quienes lo hhabían atrapado y lo llevaban volando por las copas de los árboles. Lo llevaron hasta las ruinas de un viejo templo en donde el Rey de los monos estaba comiendo plátanos mientras esperaba que le llevaran al niño.“¡Dime cómo los hombres hacen el fuego!” – le dijo el Rey Louie. – “Pero yo no sé cómo”- contestó Mowgli. Y era verdad. Aunque su vida dependiera de ello el chico no podía decirle cómo se hacía el fuego porque ¡no sabía!Por fortuna Baloo y Bagheera llegaron cuando el Rey, muy enojado con Mowglie, estaba a punto de estallar, y rápidamente planearon la forma de salvar al niño.Baloo se disfrazó de mona, pero el Rey Louie pronto descubrió el engaño. En las carreras para escapar se derrumbó el templo, pero los tres amigos escaparon ilesos.Después de la aventura con los monos, Bagheera y Baloo explicaron a Mowgli que corría aún mayores peligros en el bosque y que debía regresar con su gente a la aldea.– “¡Yo no saldré de la selva!” – protestó el niño. Y corrió y se internó de nuevo en el bosque. Nuevamente Baloo y Bagheera buscaron a Mowgli por todos lados, pero el que lo encontró fue su peor enemigo ¡el tigre Shere Khan! Y cuando vio que Mowgli no le temía se puso furioso, mostró sus colmillos y ¡saltó sobre el chico!.En esto se desató una tormenta. Un rayo cayó prendiendo fuego a un árbol. Mowgli sabía que el fuego era lo que más temía el tigre y vio la forma de salvar a Baloo. Tomó una rama ardiendo y corrió hacia la fiera. El tigre se espantó tanto que se olvidó de atacar a Baloo y huyó corriendo. – “¡A ese nunca lo volveremos a ver!”- dijo riendo Bagheera.Mowgli, Bagheera y Baloo prometieron que de ahora en adelante nada los separaría. Pero en ese momento, Mowgli vio algo que jamás había visto: era una linda chica que venía por agua a un río cerca de la aldea.Lo que sucedió después entristeció a Baloo y a Bagheera pero sólo por un momento porque comprendieron que aquello era lo mejor que podría sucederle a Mowgli. Lo vieron sonreír a la chica mientras le ayudaba a llevar el cántaro de agua caminando los dos muy felices rumbo a la aldea. Sus amigos sabían que el niño allí estaría a salvo y que ellos habían cumplido trayéndole a su nuevo hogar. Así termina el cuento EL LIBRO DE LA SELVA."
        
                     })
        .then(function(){console.log("Base de datos Cuento inicializada");});     
    }
   });

});