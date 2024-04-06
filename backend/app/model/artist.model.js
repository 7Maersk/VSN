const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('artists', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
  });

  // Associations
  Artist.associate = (models) => {
    // Many-to-Many association with Record through record_artist table
    Artist.belongsToMany(models.Record, {
      through: 'record_artist',
      foreignKey: 'artist_id',
      sourceKey: 'id',
    });

    // One-to-Many association with ExtraArtist
    Artist.hasMany(models.ExtraArtist, {
      foreignKey: 'artist_id',
      sourceKey: 'id',
    });
  };

  return Artist;
};
