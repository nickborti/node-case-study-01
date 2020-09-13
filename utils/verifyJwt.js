const jwt = require('jsonwebtoken')
const config = require('./../config/env');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.json({
            message: 'no token found'
        });
    }

    jwt.verify(token, config.tokensecret, (err, decoded) => {
        if (err) {
            return res.json({
                message: 'token error'
            });
        }
        req.userId = decoded.id;
        next();
    });
}