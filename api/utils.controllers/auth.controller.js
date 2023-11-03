const jwt = require('jsonwebtoken');
const utils = require('./utils.controller');

const verifyToken = function (req, res, next) {
    const response = {};
    let headerAuth = req.headers.authorization;

    if (headerAuth) {
        headerAuth = headerAuth.split(' ');
        if (headerAuth.length == 2) {
            const token = headerAuth[1];
            jwt.verify(token, process.env.JWT_SECRET_KEY, (error) => _handleVerification(error, res, next, response))
        }
        else {
            utils._assignResponse(response, process.env.STATUS_FORBIDDEN, { message: process.env.FORBIDDEN_MSG });
            utils._sendResponse(res, response);
        }
    }
    else {
        utils._assignResponse(response, process.env.STATUS_FORBIDDEN, { message: process.env.FORBIDDEN_MSG });
        utils._sendResponse(res, response);
    }
}

const _handleVerification = function (err, res, next, response) {
    console.log(err);
    if (err) {
        if (err.name === 'TokenExpiredError') {
            utils._assignResponse(response, process.env.STATUS_UNAUTHORIZED, process.env.TOKEN_EXPIRED_MSG);
            utils._sendResponse(res, response);
        } else {
            utils._assignResponse(response, process.env.STATUS_UNAUTHORIZED, process.env.INVALID_TOKEN_MSG);
            utils._sendResponse(res, response);
        }
    } else {
        next();
    }
}
module.exports = { verifyToken }