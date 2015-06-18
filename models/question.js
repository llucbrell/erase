//definicón de la tabla del modelo de preguntas

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'Question', 
	          { pregunta: {
	          	type: DataTypes.STRING,
	          	validate: {notEmpty: {msg: "Faltaba la Pregunta"}}
	          },
	           respuesta: {
	             type: DataTypes.STRING,
	             validate: {notEmpty: {msg: "Faltaba la Respuesta"}}
	         }
	    }    
	    
	 );
};