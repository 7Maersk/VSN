const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const RecordArtist = sequelize.define('record_artist', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    record_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'Record',
        key: 'id'
      }
    },
    artist_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'Artist',
        key: 'id'
      }
    },
  });

  // Associations
  RecordArtist.associate = (models) => {
    // BelongsTo association with Record
    RecordArtist.belongsTo(models.Record, {
      foreignKey: 'record_id',
    });

    // BelongsTo association with Artist
    RecordArtist.belongsTo(models.Artist, {
      foreignKey: 'artist_id',
    });
  };

  return RecordArtist;
};
