const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const ExtraArtist = sequelize.define('extraartists', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    song_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
  });

  // Associations
  ExtraArtist.associate = (models) => {
    // BelongsTo association with Artist
    ExtraArtist.belongsTo(models.Artist, {
      foreignKey: 'artist_id',
    });

    // BelongsTo association with Song
    ExtraArtist.belongsTo(models.Song, {
      foreignKey: 'song_id',
    });
  };

  return ExtraArtist;
};
