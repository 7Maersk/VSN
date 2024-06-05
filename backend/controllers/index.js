const userController = require('./User.controller')
const commentController = require('./Comment.controller')
const userCollectionController = require('./UserCollection.controller')
const postController = require('./Post.controller')
const artistController = require('./Artist.controller')
const recordController = require('./Record.controller')
const genreController = require('./Genre.controller')
const songController = require('./Song.controller')
const authController = require('./Auth.controller')




module.exports = { authController, userController, commentController, userCollectionController, postController, artistController, recordController, genreController, songController }