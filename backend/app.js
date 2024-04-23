require('dotenv').config()

var express = require('express')
var app = express()
var db = require('./db.config')

// var { User, Role, Comment } = require('./models')
const { userRouter, commentRouter, userCollectionRouter, postRouter, artistRouter, recordRouter } = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db.sequelize.sync().then(() => {
    app.listen(3001, () => console.log('Server is running'))
}).catch((err) => console.log(err))

app.use('/comment', commentRouter)
app.use('/user', userRouter)
app.use('/collection', userCollectionRouter)
app.use('/post', postRouter)
app.use('/artists', artistRouter)
app.use('/records', recordRouter)