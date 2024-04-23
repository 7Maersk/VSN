const { Router } = require("express");
const { genreController } = require('../controllers');

const genreRouter = Router();

genreRouter.get('/', async (req, res) => {
    await genreController.findAll(req, res);
});

module.exports = genreRouter;
