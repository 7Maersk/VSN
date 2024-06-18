const { Router } = require("express");
const { userCollectionController } = require('../controllers');
var { UserCollection } = require('../models')


const userCollectionRouter = Router();

userCollectionRouter.post('/create', async(req, res) => {
    userCollectionController.create(req, res)
})

userCollectionRouter.get('/favorite/:userId', async (req, res) => {
    await userCollectionController.getFavoriteRecords(req, res);
});

userCollectionRouter.get('/:userId', async (req, res) => {
    await userCollectionController.getUserCollection(req, res);
});

userCollectionRouter.post('/removeFromCollection', async (req, res) => {
    await userCollectionController.removeFromCollection(req, res)
});

module.exports = userCollectionRouter;