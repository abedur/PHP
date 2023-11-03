const express = require('express');

const routers = express.Router();
const actorController = require('../actors/actors.controller');
const authController = require('../utils.controllers/auth.controller');

routers.route('/movie/:id')
    .get(actorController.findAllActorsByMovieId)
    .post(authController.verifyToken, actorController.insertActorByMovieId);

routers.route('/:actorId/movie/:id')
    .get(actorController.getActorByMovieIdAndActorId)
    .delete(authController.verifyToken, actorController.deleteActorByMovieIdAndActorId)
    .put(authController.verifyToken, actorController.updateActorByMovieIdAndActorIdFull);


module.exports = routers;