// record.model.js
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('record', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    katalog_number: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    country_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });

  // Associations
  Record.associate = (models) => {
    // Many-to-Many association with Artist through record_artist table
    Record.belongsToMany(models.Artist, {
      through: 'record_artist',
      foreignKey: 'record_id',
    });

    // Many-to-Many association with User through user_collection table
    Record.belongsToMany(models.User, { 
      through: 'user_collection',
      foreignKey: 'record_id',
      sourceKey: 'id', // Добавлено указание на атрибут id в модели Record
    });

    // BelongsTo association with Country
    Record.belongsTo(models.Country, {
      foreignKey: 'country_id',
    });
  };

  return Record;
};
