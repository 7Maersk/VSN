const { Router } = require("express");
const { artistController } = require('../controllers');

const artistRouter = Router();

artistRouter.get('/', async (req, res) => {
    await artistController.findAll(req, res);
});

module.exports = artistRouter;
