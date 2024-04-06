const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const UserInfo = sequelize.define('user_info', {
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
    nickname: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    bio: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
  });

  // Optional: Define association with User model (if needed)
  UserInfo.associate = (models) => {
    // One-to-One association with User
    UserInfo.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };

  return UserInfo;
};
