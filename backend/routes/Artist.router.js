const { Router } = require("express");
const { artistController } = require('../controllers');

const artistRouter = Router();

artistRouter.get('/', async (req, res) => {
    await artistController.findAll(req, res);
});

artistRouter.get('/:artistId', async (req, res) => {
    await artistController.findById(req, res);
});

artistRouter.get('/record/:recordId', async (req, res) => {
    await artistController.getFirstArtistNickname(req, res)
})

module.exports = artistRouter;
