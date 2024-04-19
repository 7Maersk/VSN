const { Router } = require("express");
const { userCollectionController } = require('../controllers');
var { UserCollection } = require('../models')


const userCollectionRouter = Router();

userCollectionRouter.post('/create', async(req, res) => {
    userCollectionController.create(req, res)
})

module.exports = userCollectionRouter;