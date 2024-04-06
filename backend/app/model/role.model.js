const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('roles', {
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
  Role.associate = (models) => {
    // HasMany association with User
    Role.hasMany(models.User, {
      foreignKey: 'role_id',
      sourceKey: 'id',
    });
  };  

  return Role;
};