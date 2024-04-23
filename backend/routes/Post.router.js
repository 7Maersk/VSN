const { Router } = require("express");
const { postController } = require('../controllers');

const postRouter = Router();

postRouter.post('/create', async (req, res) => {
    postController.create(req, res);
});

postRouter.delete('/:postId', async (req, res) => {
    await postController.delete(req, res);
});

postRouter.get('/:postId', async (req, res) => {
    await postController.findById(req, res);
});

postRouter.get('/', async (req, res) => {
    await postController.findAll(req, res);
});

module.exports = postRouter;
