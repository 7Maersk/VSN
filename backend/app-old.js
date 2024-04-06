var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных

db.sequelize.sync({force: false});

app.get('/users', async (req, res) => {
    const Users = await db.User.findAll()
    res.json({ users: Users })
})

app.listen(3000);