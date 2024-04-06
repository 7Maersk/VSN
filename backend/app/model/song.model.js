// song.model.js
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('songs', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    record_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
  });

  // Associations
  Song.associate = (models) => {
    // Belongs-To-Many association with Record through record_artist table
    Song.belongsToMany(models.Record, {
      through: 'record_artist', // Указываем таблицу-посредник
      foreignKey: 'song_id', // Внешний ключ для модели Song
    });
  };

  return Song;
};
