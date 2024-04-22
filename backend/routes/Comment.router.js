const { Router } = require("express");
const { commentController } = require('../controllers');

const commentRouter = Router();

commentRouter.post('/create', async (req, res) => {
    commentController.create(req, res);
});

commentRouter.get('/getby', async (req, res) => {
    commentController.getBy(req, res);
});

module.exports = commentRouter;
