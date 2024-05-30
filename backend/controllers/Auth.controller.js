const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.headers.authorization?.split('Bearer ')[1] || ''; 

    if (!token) {
         res.status(403).send({
            message: "Токен не предоставлен"
        });
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({
                message: "Неверно введенный логин и/или пароль"
            });
            return;
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = { verifyToken }