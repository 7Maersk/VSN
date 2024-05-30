const { Router } = require("express");
const { recordController } = require('../controllers');

const recordRouter = Router();

recordRouter.get('/', async (req, res) => {
    await recordController.findAll(req, res);
});

recordRouter.get('/:recordId', async (req, res) => {
    await recordController.findById(req, res);
});

recordRouter.get('/artistn/:artistName', async (req, res) => {
    await recordController.findByArtist(req, res);
});

recordRouter.get('/genre/:genre', async (req, res) => {
    await recordController.findByGenre(req, res);
});

recordRouter.get('/country/:countryName', async (req, res) => {
    await recordController.findByCountry(req, res);
});

recordRouter.get('/artist/:artistId', async (req, res) => {
    await recordController.findByArtistId(req, res);
});

recordRouter.post('/add', async (req, res) => {
    await recordController.addById(req, res);
});

recordRouter.get('/testing', async (req, res) => await recordController.testing(req, res))

module.exports = recordRouter;
