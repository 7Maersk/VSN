const { Router } = require('express')
const { userController } = require('../controllers')
var { User } = require('../models')
const userRouter = Router()

const multer = require('multer')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		return cb(null, './public/avatars')
	},
	filename: function (req, file, cb) {
		return cb(null, Date.now() + '-' + file.originalname)
	},
})

const upload = multer({ storage: storage })

userRouter.post('/register', async (req, res) => {
	userController.register(req, res)
})

userRouter.post('/logout', async (req, res) => {
	userController.logout(req, res)
})

userRouter.post('/login', async (req, res) => {
	userController.login(req, res)
})

userRouter.post('/delete', async (req, res) => {
	userController.delete(req, res)
})

userRouter.post('/updatepassword', async (req, res) => {
	userController.updatePassword(req, res)
})

userRouter.get('/userBoard', async (req, res) => {
	userController.verifyToken(req, res)
})

userRouter.get('/', async (req, res) => {
	var users = await User.findAll()
	return res.json({ status: 'ok', users })
})

userRouter.get('/:user_id', async (req, res) => {
	userController.getUserInfo(req, res)
})

userRouter.post('/updateinfo', upload.single('picture'), async (req, res) => {
	userController.updateUserInfo(req, res)
})

module.exports = userRouter
