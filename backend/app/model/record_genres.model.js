const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const RecordGenre = sequelize.define('record_genre', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    record_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    genre_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
  });

  // Associations
  RecordGenre.associate = (models) => {
    // BelongsTo association with Record
    RecordGenre.belongsTo(models.Record, {
      foreignKey: 'record_id',
    });

    // BelongsTo association with Genre
    RecordGenre.belongsTo(models.Genre, {
      foreignKey: 'genre_id',
    });
  };

  return RecordGenre;
};
