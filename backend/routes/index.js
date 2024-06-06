const commentRouter = require('./Comment.router')
const userRouter = require('./User.router')
const userCollectionRouter = require('./UserCollection.router')
const postRouter = require('./Post.router')
const artistRouter = require('./Artist.router')
const recordRouter = require('./Record.router')
const genreRouter = require('./Genre.router')
const songRouter = require('./Song.router')
const authRouter = require('./Auth.router')
const roomRouter = require('./Room.router')


module.exports = { commentRouter, userRouter, userCollectionRouter, postRouter, artistRouter, recordRouter, genreRouter, songRouter, authRouter, roomRouter }