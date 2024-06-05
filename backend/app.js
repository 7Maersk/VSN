require('dotenv').config()

var express = require('express')
var app = express()
var db = require('./db.config')
var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
};

const { userRouter, commentRouter, userCollectionRouter, postRouter, artistRouter, recordRouter, genreRouter, songRouter, authRouter } = require('./routes');
const { verifyToken } = require('./controllers/Auth.controller');

app.use(cors(corsOptions));
app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db.sequelize.sync().then(() => {
    app.listen(3001, () => console.log('Server is running'))
    fillDB()

}).catch((err) => console.log(err))

app.use('/api/comment', commentRouter)
app.use('/api/user', userRouter)
app.use('/api/collection', userCollectionRouter)
app.use('/api/post', postRouter)
app.use('/api/artists', artistRouter)
app.use('/api/records', recordRouter)
app.use('/api/genres', genreRouter)
app.use('/api/songs', songRouter)
app.use('/api/auth', authRouter)

function fillDB() {
    console.log()
}