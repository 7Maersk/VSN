const { Router } = require("express");
const { ticketController } = require('../controllers');

const ticketRouter = Router();

ticketRouter.post('/create', async (req, res) => {
    await ticketController.create(req, res);
});

ticketRouter.delete('/delete/:id', async (req, res) => {
    await ticketController.delete(req, res);
});

ticketRouter.get('/', async (req, res) => {
    await ticketController.findAll(req, res);
});

module.exports = ticketRouter;
