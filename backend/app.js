require('dotenv').config()

var express = require('express')
var app = express()
var db = require('./db.config')
    
// var { User, Role, Comment } = require('./models')
const { userRouter, commentRouter, userCollectionRouter } = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db.sequelize.sync().then(() => {
    app.listen(3001, () => console.log('Server is running'))
}).catch((err) => console.log(err))

app.use('/comment', commentRouter)
app.use('/user', userRouter)
app.use('/collection', userCollectionRouter)

// app.post('/collection/create', async(req, res) => {
//     userCollectionController.create(req, res)
// })

// app.get('/users', async (req, res) => {
//     var users = await User.findAll()
//     return res.json({ status: 'ok', users })
// })

// app.post('/user/create', async (req, res) => {
//     userController.create(req, res)
// })

// app.post('/user/delete', async (req, res) => {
//     userController.delete(req, res)
// })

// app.post('/comment/create', async (req, res) => {
//     commentController.create(req, res)
// })
// app.get('/comment/getby', async (req, res) => {
//     commentController.getBy(req, res)
// })