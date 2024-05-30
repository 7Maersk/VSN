const { Router } = require("express");
const { songController } = require('../controllers');

const songRouter = Router();

songRouter.get('/:recordId', async (req, res) => {
    await songController.findSongsByRecordId(req, res);
});

module.exports = songRouter;
