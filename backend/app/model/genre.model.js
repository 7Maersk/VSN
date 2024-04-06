const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('genres', {
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
  Genre.associate = (models) => {
    // HasMany association with Song
    Genre.hasMany(models.Song, {
      foreignKey: 'genre_id',
      sourceKey: 'id',
    });
  };

  return Genre;
};
