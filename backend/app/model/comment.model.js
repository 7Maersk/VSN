const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT, // Changed to TEXT type
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    record_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
  });

  // Associations
  Comment.associate = (models) => {
    // BelongsTo association with User
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE', // Added onDelete
      onUpdate: 'CASCADE', // Added onUpdate
    });

    // BelongsTo association with Post
    Comment.belongsTo(models.Post, {
      foreignKey: 'post_id',
      onDelete: 'CASCADE', // Added onDelete
      onUpdate: 'CASCADE', // Added onUpdate
    });

    // BelongsTo association with Record
    Comment.belongsTo(models.Record, {
      foreignKey: 'record_id',
      onDelete: 'CASCADE', // Added onDelete
      onUpdate: 'CASCADE', // Added onUpdate
    });
  };

  return Comment;
};
