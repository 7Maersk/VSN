const { Router } = require("express");
const { userController } = require('../controllers');
var { User } = require('../models')


const userRouter = Router();

userRouter.post('/create', async (req, res) => {
    userController.create(req, res);
});

userRouter.post('/user/delete', async (req, res) => {
    userController.delete(req, res)
})

userRouter.get('/', async (req, res) => {
    var users = await User.findAll()
    return res.json({ status: 'ok', users })
})

module.exports = userRouter;