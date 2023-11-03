const mongoose = require('mongoose');
//const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./user.model');
const utils = require('../utils.controllers/utils.controller');

const login = function (req, res) {
    const response = {
        is_assigned: false
    };

    if (req.body && req.body.username && req.body.password) {
        User.findOne({ username: req.body.username })
            .then((foundUser) => _checkExist(foundUser, response))
            .then((user) => _checkPassword(user, req.body.password, response))
            .then((user) => {
                const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET_KEY, { expiresIn: parseInt(process.env.JWT_EXPIRTY_TIME) });
                utils._assignResponse(response, process.env.STATUS_OK, { token: token });
            })
            .catch(err => {
                if (!response.is_assigned) {
                    response.is_assigned = true;
                    utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, process.env.STATUS_INTERNAL_SERVER_ERROR_MSG);
                }
            })
            .finally(() => utils._sendResponse(res, response));
    } else {
        utils._assignResponse(response, process.env.STATUS_BAD_REQUEST, process.env.USERNAME_PASSWORD_REQUIRED_MSG);
        utils._sendResponse(res, response);
    }
}

const _checkPassword = function (user, password, response) {
    //console.log(user, password, response);

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password)
            .then(matched => {
                if (matched) {
                    resolve(user);
                } else {
                    response.is_assigned = true;
                    utils._assignResponse(response, process.env.STATUS_UNAUTHORIZED, { message: process.env.INVALID_USERNAME_PASSWORD_MSG });
                    reject();
                }
            })
            .catch(() => reject());
    });

}

const _checkExist = function (user, response) {
    return new Promise((resove, reject) => {
        if (user) {
            resove(user);
        } else {
            response.is_assigned = true;
            utils._assignResponse(response, process.env.STATUS_UNAUTHORIZED, { message: process.env.INVALID_USERNAME_PASSWORD_MSG });
            reject();
        }
    });
}


const register = function (req, res) {
    const response = {};

    if (req.body && req.body.username && req.body.password) {
        bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))
            .then(salt => _generateHash(salt, req.body.password))
            .then(encryptedPassword => _createUser(req.body.name, req.body.username, encryptedPassword))
            .then(createdUser => utils._assignResponse(response, process.env.STATUS_OK, createdUser))
            .catch((err) => utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
            .finally(() => utils._sendResponse(res, response));
    } else {
        utils._assignResponse(response, process.env.STATUS_BAD_REQUEST, process.env.USERNAME_PASSWORD_REQUIRED_MSG);
        utils._sendResponse(res, response);
    }
}
const _createUser = function (name, username, password) {
    const newUser = {
        name: name,
        username: username,
        password: password
    }
    return User.create(newUser);
}
const _generateHash = function (salt, password) {
    console.log(salt, password)
    return bcrypt.hash(password, salt);
}

module.exports = {
    register: register,
    login: login
}