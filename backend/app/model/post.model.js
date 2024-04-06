const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
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
      type: DataTypes.STRING(2048),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
  });

  // Associations
  Post.associate = (models) => {
    // BelongsTo association with User
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
    });

    // HasMany association with Comment
    Post.hasMany(models.Comment, {
      foreignKey: 'post_id',
      sourceKey: 'id',
    });
  };

  return Post;
};
