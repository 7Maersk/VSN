require('dotenv').config()

var express = require('express')
var app = express()
var http = require('http')
var server = http.createServer(app)
var { Server } = require('socket.io')
var io = new Server(server, {
	cors: {
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST'],
		credentials: true,
	},
})

var db = require('./db.config')
var cors = require('cors')
var corsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
	optionSuccessStatus: 200,
}


const {
	userRouter,
	commentRouter,
	userCollectionRouter,
	postRouter,
	artistRouter,
	recordRouter,
	genreRouter,
	songRouter,
	authRouter,
	roomRouter,
} = require('./routes')
const { verifyToken } = require('./controllers/Auth.controller')
const { Message, Room, UserInfo } = require('./models')
const { roomController } = require('./controllers')
const ticketRouter = require('./routes/Ticket.router')

app.use(cors(corsOptions))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db.sequelize
	.sync()
	.then(() => {
		server.listen(3001, () => console.log('Server is running'))
		fillDB()
	})
	.catch((err) => console.log(err))

app.use('/api/comment', commentRouter)
app.use('/api/user', userRouter)
app.use('/api/collection', userCollectionRouter)
app.use('/api/post', postRouter)
app.use('/api/artists', artistRouter)
app.use('/api/records', recordRouter)
app.use('/api/genres', genreRouter)
app.use('/api/songs', songRouter)
app.use('/api/auth', authRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/ticket', ticketRouter)

io.on('connection', (socket) => {
	socket.on('joinRoom', async (roomName) => {
		try {
			let room = await Room.findOne({ where: { name: roomName } })
			if (!room) {
				room = await Room.create({ name: roomName })
			}

			socket.join(room.id)

			const messages = await Message.findAll({
				where: { room_id: room.id },
				order: [['datetime', 'ASC']],
			})

			const formattedMessages = await Promise.all(
				messages.map(async (msg) => {
					const user_info = await UserInfo.findOne({ where: { user_id: msg.user_id } })
					return {
						...msg.toJSON(),
						nickname: user_info ? user_info.nickname : 'Unknown',
					}
				})
			)

			socket.emit('initialMessages', formattedMessages)
		} catch (error) {
			console.error('Error joining room:', error)
			socket.emit('error', 'Error joining room')
		}
	})

	socket.on('sendMessage', async ({ room: roomName, message, user_id }) => {
		if (!message || !user_id) {
			socket.emit('error', 'Message text and user_id cannot be empty')
			return
		}

		const room = await Room.findOne({ where: { name: roomName } })

		if (room) {
			const newMessage = await Message.create({
				text: message,
				room_id: room.id,
				user_id: user_id,
				datetime: new Date(),
			})

			const userInfo = await UserInfo.findOne({ where: { user_id: user_id } })

			io.to(room.id).emit('receiveMessage', {
				...newMessage.toJSON(),
				nickname: userInfo ? userInfo.nickname : 'Unknown',
			})
		} else {
			socket.emit('error', 'Room not found')
		}
	})
})

function fillDB() {
	console.log()
}
