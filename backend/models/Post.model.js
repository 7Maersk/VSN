var { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db.config')

class Post extends Model { }

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    datetime: {
        type: DataTypes.DATE,
        allowNull: false
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    text: {
        type: DataTypes.STRING,
        allowNull: false
    }, 

    img: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'post',
    timestamps: false,
    underscored: true,
    sequelize: sequelize
})

module.exports = Post 