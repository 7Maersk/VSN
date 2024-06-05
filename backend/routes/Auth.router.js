const { Router } = require('express')
const { authController } = require('../controllers')
const authRouter = Router()

authRouter.post('/refresh', async (req, res) => {
    return await authController.refreshToken(req, res)
})

module.exports = authRouter