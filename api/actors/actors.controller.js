const mongoose = require('mongoose');
const Movie = mongoose.model(process.env.MOVIE_MODEL);

const utils = require('../utils.controllers/utils.controller');

const _insertActor = function (req, movie, cast, response) {
    if (!movie) utils.utils._assignResponse(response, process.env.RECORD_NOT_FOUND, process.env.RECORD_NOT_FOUND_MSG);
    movie.actors.push(cast);
    return movie.save();
}

const insertActorByMovieId = function (req, res) {
    const movieId = req.params.id;
    const newCast = {
        actor: req.body.actor,
        debut_year: req.body.debut_year
    }
    const response = {};

    Movie.findById(movieId).exec()
        .then((returnedMovie) => _insertActor(req, returnedMovie, newCast, response))
        .then((insertedActor) => utils._assignResponse(response, process.env.STATUS_OK, insertedActor))
        .catch((err) => utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, process.env.STATUS_INTERNAL_SERVER_ERROR_MSG))
        .finally(() => utils._sendResponse(res, response));
}


const findAllActorsByMovieId = function (req, res) {
    const movieId = req.params.id;
    const response = {};
    Movie.findById(movieId).select(process.env.COLLECTION_ACTORS).exec()
        .then((foundActors) => utils._assignResponse(response, process.env.STATUS_OK, foundActors.actors))
        .catch((err) => utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, process.env.STATUS_INTERNAL_SERVER_ERROR_MSG))
        .finally(() => utils._sendResponse(res, response));
}


const _findActorByActorId = function (req, actors, response) {

    if (!actors) return utils._assignResponse(response, process.env.RECORD_NOT_FOUND, process.env.RECORD_NOT_FOUND_MSG);

    const actor = actors.find(actor => actor._id.toString() == req.params.actorId);
    if (!actor) return utils._assignResponse(response, process.env.RECORD_NOT_FOUND, process.env.RECORD_NOT_FOUND_MSG);

    return utils._assignResponse(response, process.env.STATUS_OK, actor);
}

const getActorByMovieIdAndActorId = function (req, res) {
    const movieId = req.params.id;
    const actorId = req.params.actorId;
    const response = {};

    Movie.findById(movieId).select(process.env.COLLECTION_ACTORS).exec()
        .then((foundActors) => {
            _findActorByActorId(req, foundActors.actors, response)

        })
        .catch((err) => utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, process.env.STATUS_INTERNAL_SERVER_ERROR_MSG))
        .finally(() => utils._sendResponse(res, response));
}

const _removeActorById = function (req, foundActors, response) {
    if (!foundActors) return utils._assignResponse(response, process.env.RECORD_NOT_FOUND, process.env.RECORD_NOT_FOUND_MSG);
    const actorIndex = foundActors.actors.findIndex(actor => actor._id.toString() == req.params.actorId);
    if (actorIndex === -1) return utils._assignResponse(response, process.env.RECORD_NOT_FOUND, process.env.RECORD_NOT_FOUND_MSG);

    foundActors.actors.splice(actorIndex, 1);
    return foundActors.save();
}
const deleteActorByMovieIdAndActorId = function (req, res) {
    const movieId = req.params.id;
    const actorId = req.params.actorId;
    const response = {};
    console.log("Movie ID:" + movieId + " Actor ID:" + actorId);

    Movie.findById(movieId).select(process.env.COLLECTION_ACTORS).exec()
        .then((foundActors) => _removeActorById(req, foundActors, response))
        .then((deletedMovie) => utils._assignResponse(response, process.env.STATUS_OK, deletedMovie))
        .catch((err) => utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, process.env.STATUS_INTERNAL_SERVER_ERROR_MSG))
        .finally(() => utils._sendResponse(res, response));
}


const updateActorByMovieIdAndActorIdFull = function (req, res) {
    const response = {};
    const movieId = req.params.id;
    const actorId = req.params.actorId;
    console.log("Movie ID:" + movieId + " Actor ID:" + actorId);
    Movie.findById(movieId).select(process.env.COLLECTION_ACTORS).exec()
        .then((foundActors) => {
            if (!foundActors.actors.id(req.params.actorId).id) utils._assignResponse(response, process.env.RECORD_NOT_FOUND, process.env.RECORD_NOT_FOUND_MSG);

            foundActors.actors.id(req.params.actorId).actor = req.body.actor;
            foundActors.actors.id(req.params.actorId).debut_year = req.body.debut_year;
            foundActors.save();
            utils._assignResponse(response, process.env.STATUS_OK, process.env.STATUS_OK_UPDATED);

        })

        .catch((err) => utils._assignResponse(response, process.env.RECORD_NOT_FOUND, process.env.RECORD_NOT_FOUND_MSG))
        .finally(() => utils._sendResponse(res, response));
}


module.exports = {
    findAllActorsByMovieId: findAllActorsByMovieId,
    insertActorByMovieId: insertActorByMovieId,
    getActorByMovieIdAndActorId: getActorByMovieIdAndActorId,
    deleteActorByMovieIdAndActorId: deleteActorByMovieIdAndActorId,
    updateActorByMovieIdAndActorIdFull: updateActorByMovieIdAndActorIdFull
}
