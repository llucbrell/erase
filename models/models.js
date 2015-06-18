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
       if (count < 3){
        Cuento.create({titulo: "El Soldadito de plomo" , cuento: "Éranse una vez veinticinco soldados de plomo, todos hermanos, pues los habían fundido de una misma cuchara vieja. Llevaban el fusil al hombro y miraban de frente; el uniforme era precioso, rojo y azul. La primera palabra que escucharon en cuanto se levantó la tapa de la caja que los contenía fue: «¡Soldados de plomo!». La pronunció un chiquillo, dando una gran palmada. Eran el regalo de su cumpleaños, y los alineó sobre la mesa. Todos eran exactamente iguales, excepto uno, que se distinguía un poquito de los demás: le faltaba una pierna, pues había sido fundido el último, y el plomo no bastaba. Pero con una pierna, se sostenía tan firme como los otros con dos, y de él precisamente vamos a hablar aquí. En la mesa donde los colocaron había otros muchos juguetes, y entre ellos destacaba un bonito castillo de papel, por cuyas ventanas se veían las salas interiores. Enfrente, unos arbolitos rodeaban un espejo que semejaba un lago, en el cual flotaban y se reflejaban unos cisnes de cera. Todo era en extremo primoroso, pero lo más lindo era una muchachita que estaba en la puerta del castillo. De papel también ella, llevaba un hermoso vestido y una estrecha banda azul en los hombros, a modo de fajín, con una reluciente estrella de oropel en el centro, tan grande como su cara. La chiquilla tenía los brazos extendidos, pues era una bailarina, y una pierna levantada, tanto, qué el soldado de plomo, no alcanzando a descubrirla, acabó por creer que sólo tenía una, como él. «He aquí la mujer que necesito -pensó-. Pero está muy alta para mí: vive en un palacio, y yo por toda vivienda sólo tengo una caja, y además somos veinticinco los que vivimos en ella; no es lugar para una princesa. Sin embargo, intentaré establecer relaciones». Todo iluminado y sintió un calor espantoso, aunque no sabía si era debido al fuego o al amor. Sus colores se habían borrado también, a consecuencia del viaje o por la pena que sentía; nadie habría podido decirlo. Miró de nuevo a la muchacha, encontráronse las miradas de los dos, y él sintió que se derretía, pero siguió firme, arma al hombro. Abrióse la puerta, y una ráfaga de viento se llevó a la bailarina, que, cual una sílfide, se levantó volando para posarse también en la chimenea, junto al soldado; se inflamó y desapareció en un instante. A su vez, el soldadito se fundió, quedando reducido a una pequeña masa informe. Cuando, al día siguiente, la criada sacó las cenizas de la estufa, no quedaba de él más que un trocito de plomo en forma de corazón; de la bailarina, en cambio, había quedado la estrella de oropel, carbonizada y negra."
                     });                    
        Cuento.create({titulo: "Los tres cerditos" , cuento: "En el corazón del bosque vivían tres cerditos que eran hermanos. El lobo siempre andaba persiguiéndoles para comérselos. Para escapar del lobo, los cerditos decidieron hacerse una casa. El pequeño la hizo de paja, para acabar antes y poder irse a jugar. El mediano construyó una casita de madera. Al ver que su hermano pequeño había terminado ya, se dio prisa para irse a jugar con él. El mayor trabajaba en su casa de ladrillo. Ya veréis lo que hace el lobo con vuestras casas- riñó a sus hermanos mientras éstos se lo pasaban en grande. El lobo salió detrás del cerdito pequeño y él corrió hasta su casita de paja, pero el lobo sopló y sopló y la casita de paja derrumbó.  El lobo persiguió también al cerdito por el bosque, que corrió a refugiarse en casa de su hermano mediano. Pero el lobo sopló y sopló y la casita de madera derribó. Los dos cerditos salieron pitando de allí. Casi sin aliento, con el lobo pegado a sus talones, llegaron a la casa del hermano mayor. Los tres se metieron dentro y cerraron bien todas las puertas y ventanas. El lobo se puso a dar vueltas a la casa, buscando algún sitio por el que entrar. Con una escalera larguísima trepó hasta el tejado, para colarse por la chimenea. Pero el cerdito mayor puso al fuego una olla con agua. El lobo comilón descendió por el interior de la chimenea, pero cayó sobre el agua hirviendo y se escaldó. Escapó de allí dando unos terribles aullidos que se oyeron en todo el bosque. Se cuenta que nunca jamás quiso comer cerdito."
                     });
        Cuento.create({titulo: "El libro de la Selva" , cuento: "Este es el cuento de un niño a quien Bagheera, la pantera negra, se encontró en la selva. Bagheera llevó al niño con unos lobos amigos quienes lo criaron como su propio hijo y lo llamaron Mowgli. Mowgli aprendió a vivir en la selva, pero siempre cuidado de cerca por su protector y amigo Bagheera. Los elefantes también se hicieron amigos, aun el coronel Hathi, un elefante gruñón que era el jefe y que todas las mañanas, dictando órdenes, los hacía marchar. No todos en la selva eran amistosos. Kaa, la boa hambrienta, ¡Quería comerse a Mowgli! Los de ojos Kaa hipnotizaban a cualquiera, y hacían pedazos al que apretaba entre sus anillos. Pero Mowgli tenía un enemigo más peligroso, Shere Khan, el tigre, quien estaba empeñado en matarlo antes de que Mowgli llegara a ser hombre. El capitán de la manada de lobos decidió que sólo había una forma de salvar al chico. – “Este niño debe ser llevado a la aldea del hombre”- dijo. Y Bagheera estuvo de acuerdo en llevarlo hasta la aldea. Mowgli pensó que Bagheera sólo lo llevaba a dar un paseo pero cuando le dijo a dónde lo llevaba, Mowgli gritó enojada –“¡No iré! ¡Quiero quedarme en la selva!”-. El chico huyó y se internó solo en el bosque en donde, al poco se hizo amigo de un oso alegre y vagabundo llamado Baloo. Baloo invitó al niño a nadar en el río y mientras el oso flotaba sobre su ancha espalda, Mowgli iba montado cómodamente sobre la panza de su amigo. De pronto, Mowgli sintió que alguien lo elevaba por los aires. Era una pandilla de pícaros monos quienes lo hhabían atrapado y lo llevaban volando por las copas de los árboles. Lo llevaron hasta las ruinas de un viejo templo en donde el Rey de los monos estaba comiendo plátanos mientras esperaba que le llevaran al niño. “¡Dime cómo los hombres hacen el fuego!” – le dijo el Rey Louie. – “Pero yo no sé cómo”- contestó Mowgli. Y era verdad. Aunque su vida dependiera de ello el chico no podía decirle cómo se hacía el fuego porque ¡no sabía! Por fortuna Baloo y Bagheera llegaron cuando el Rey, muy enojado con Mowglie, estaba a punto de estallar, y rápidamente planearon la forma de salvar al niño. Baloo se disfrazó de mona, pero el Rey Louie pronto descubrió el engaño. En las carreras para escapar se derrumbó el templo, pero los tres amigos escaparon ilesos. Después de la aventura con los monos, Bagheera y Baloo explicaron a Mowgli que corría aún mayores peligros en el bosque y que debía regresar con su gente a la aldea. – “¡Yo no saldré de la selva!” – protestó el niño. Y corrió y se internó de nuevo en el bosque. Nuevamente Baloo y Bagheera buscaron a Mowgli por todos lados, pero el que lo encontró fue su peor enemigo ¡el tigre Shere Khan! Y cuando vio que Mowgli no le temía se puso furioso, mostró sus colmillos y ¡saltó sobre el chico!. En esto se desató una tormenta. Un rayo cayó prendiendo fuego a un árbol. Mowgli sabía que el fuego era lo que más temía el tigre y vio la forma de salvar a Baloo. Tomó una rama ardiendo y corrió hacia la fiera. El tigre se espantó tanto que se olvidó de atacar a Baloo y huyó corriendo. – “¡A ese nunca lo volveremos a ver!”- dijo riendo Bagheera. Mowgli, Bagheera y Baloo prometieron que de ahora en adelante nada los separaría. Pero en ese momento, Mowgli vio algo que jamás había visto: era una linda chica que venía por agua a un río cerca de la aldea. Lo que sucedió después entristeció a Baloo y a Bagheera pero sólo por un momento porque comprendieron que aquello era lo mejor que podría sucederle a Mowgli. Lo vieron sonreír a la chica mientras le ayudaba a llevar el cántaro de agua caminando los dos muy felices rumbo a la aldea. Sus amigos sabían que el niño allí estaría a salvo y que ellos habían cumplido trayéndole a su nuevo hogar. Así termina el cuento EL LIBRO DE LA SELVA."
                     })
        .then(function(){console.log("Base de datos Cuento inicializada");});     
    }
   });

});