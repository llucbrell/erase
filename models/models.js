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

exports.Question = Question;//exportar definición de la tabla Quiz

//creamos e incializamos la tabla de preguntas
sequelize.sync().then(function(){
	//success(..) ejecuta el manejador una vez creada la tabla
	Question.count().then(function (count){
		if (count === 0){//la tabla se inicaliza solo si es vacía
         Question.create({ pregunta: "Autor del Soldadito de Plomo",
                           respuesta: "Andersen"
                         });
         Question.create({ pregunta: "¿Muere el Soldadito?",
                           respuesta:"Si"
                         });
         Question.create({ pregunta: "¿Se enamora el Soldadito?",
                           respuesta:"Si"
                         })
         .then(function(){console.log("Base de datos inicializada");});
		}
	});
});
