const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const UserCollection = sequelize.define('user_collection', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    record_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'record',
        key: 'id',
      },
    },
    is_fav: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    added_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });

  // Связи
  UserCollection.associate = (models) => {
    // Связь "один-ко-многим" с таблицей User
    UserCollection.belongsTo(models.User, {
      foreignKey: 'user_id',
    });

    // Связь "один-ко-многим" с таблицей Record
    UserCollection.belongsTo(models.Record, {
      foreignKey: 'record_id',
    });
  };

  return UserCollection;
};
