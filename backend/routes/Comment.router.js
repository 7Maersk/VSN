const { Router } = require("express");
const { commentController } = require('../controllers');
const { verifyToken } = require("../controllers/Auth.controller");

const commentRouter = Router();

// commentRouter.post('/create', verifyToken, async (req, res) => {
//     commentController.create(req, res);
// });

commentRouter.post('/create', async (req, res) => {
    commentController.create(req, res);
});

commentRouter.get('/getby', async (req, res) => {
    commentController.getComments(req, res);
});


module.exports = commentRouter;
