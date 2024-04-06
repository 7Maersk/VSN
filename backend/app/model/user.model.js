const Sequelize = require('sequelize');
const roleModel = require('./role.model');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    roleId: { // Use camelCase for consistency
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: { // Define foreign key constraint
        model: roleModel, // Assuming the roles table is named 'roles'
        key: 'id',
      },
    },
  });

  // Define association with UserInfo model
  User.associate = (models) => {
    // One-to-One association with UserInfo
    User.hasOne(models.UserInfo, {
      foreignKey: 'user_id',
    });
  };

  return User;
};
