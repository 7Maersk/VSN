const { Router } = require("express");
const { userController } = require('../controllers');
var { User } = require('../models')


const userRouter = Router();

userRouter.post('/register', async (req, res) => {
    userController.register(req, res);
});

userRouter.post('/login', async (req, res) => {
    userController.login(req, res);
});

userRouter.post('/delete', async (req, res) => {
    userController.delete(req, res)
})

userRouter.get('/userBoard', async (req, res) => {
    userController.verifyToken(req, res)
})

userRouter.get('/', async (req, res) => {
    var users = await User.findAll()
    return res.json({ status: 'ok', users })
})

module.exports = userRouter;