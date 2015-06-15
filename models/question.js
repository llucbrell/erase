//definicón de la tabla del modelo de preguntas

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Question', 
	          { pregunta: DataTypes.STRING,
	          	respuesta: DataTypes.STRING,
	          });
};