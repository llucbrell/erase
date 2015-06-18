//definicón de la tabla del modelo de preguntas

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Cuento', 
	          { titulo: DataTypes.STRING,
	          	cuento: DataTypes.STRING,
	          });
};