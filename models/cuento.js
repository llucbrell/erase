//definicón de la tabla del modelo de cuentos

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Cuento', 
	          { titulo: DataTypes.STRING,
	          	cuento: DataTypes.TEXT,
	          });
};