const { Router } = require("express");
const { roomController } = require('../controllers');

const roomRouter = Router();

roomRouter.get('/', async (req, res) => {
    await roomController.findAll(req, res);
});

module.exports = roomRouter;
