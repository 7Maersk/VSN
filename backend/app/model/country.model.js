const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('countries', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  });

  // Associations
  Country.associate = (models) => {
    // HasMany association with Record
    Country.hasMany(models.Record, {
      foreignKey: 'country_id',
      sourceKey: 'id',
    });
  };

  return Country;
};
