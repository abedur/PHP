const mongoose = require('mongoose');
const Movie = mongoose.model(process.env.MOVIE_MODEL);

const utils = require('../utils.controllers/utils.controller');

// 1
const getAllMovies = function (req, res) {
    let count = parseInt(process.env.COUNT, process.env.MAX_COUNT);
    let offset = parseInt(process.env.OFFSET, process.env.MAX_COUNT);
    let search = "";
    const response = {};

    if (req.query && (req.query.count || req.query.offset)) {
        if (isNaN(req.query.count) || isNaN(req.query.offset)) {
            utils._assignResponse(response, process.env.STATUS_BAD_REQUEST, process.env.STATUS_BAD_REQUEST_MSG);
            utils._sendResponse(res, response);
            return;
        }
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, process.env.MAX_COUNT);
    }
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, process.env.MAX_COUNT);
    }
    if (req.query && req.query.search) {
        search = req.query.search;
    } else {
        search = "";
    }

    Movie.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } }).skip(offset).limit(count).exec()
        .then(movie => utils._assignResponse(response, process.env.STATUS_OK, movie))
        .catch(err => utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(() => utils._sendResponse(res, response));
}

const searchMovies = function (req, res) {
    let count = parseInt(process.env.COUNT, process.env.MAX_COUNT);
    let offset = parseInt(process.env.OFFSET, process.env.MAX_COUNT);

    const response = {};
    if (req.body.title) {
        Movie.find({ title: { $regex: '.*' + req.body.title + '.*', $options: 'i' } }).skip(offset).limit(count).exec()
            .then(movies => utils._assignResponse(response, process.env.STATUS_OK, movies))
            .catch(err => utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
            .finally(() => utils._sendResponse(res, response));
    }
    else {
        utils._assignResponse(response, process.env.STATUS_USER_ERROR, { message: process.env.EMPTY_SEARCH_MSG });
        utils._sendResponse(res, response);
    }
}

// 2
const createMovie = function (req, res) {
    const response = {};
    const newMovie = {
        title: req.body.title,
        year: req.body.year,
        rating: req.body.rating,
        actors: []
    };
    Movie.create(newMovie)
        .then((movie) => utils._assignResponse(response, process.env.STATUS_CREATED, movie))
        .catch(() => utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(() => utils._sendResponse(res, response));
}

// 3
const getById = function (req, res) {
    const movieId = req.params.id;
    const response = {};

    Movie.findById(movieId).exec()
        .then((movie) => utils._assignResponse(response, process.env.STATUS_OK, movie))
        .catch((err) => utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(() => utils._sendResponse(res, response));
}

// 4
const deleteMovie = function (req, res) {
    let movieId = req.params.id;
    const response = {};

    Movie.findByIdAndDelete(movieId)
        .then((movie) => utils._assignResponse(response, process.env.STATUS_OK, process.env.STATUS_OK_DELETED))
        .catch((err) => utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(() => utils._sendResponse(res, response));
}

// 5
const updateMovieFull = function (req, res) {
    const response = {};

    Movie.updateOne({ _id: req.params.id }, { $set: req.body })
        .then((acknowledged) => {
            if (acknowledged.modifiedCount === 1) {
                utils._assignResponse(response, process.env.STATUS_OK, process.env.STATUS_OK_UPDATED);
            } else {
                utils._assignResponse(response, process.env.RECORD_NOT_FOUND, process.env.RECORD_NOT_FOUND_NO_CHANGE_MSG);
            }
        })
        .catch((error) => utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, process.env.STATUS_INTERNAL_SERVER_ERROR_MSG))
        .finally(() => utils._sendResponse(res, response));
}

// 6.1
const _savePartialData = function (req, foundMovie, response) {
    if (!foundMovie) return utils._assignResponse(response, process.env.RECORD_NOT_FOUND, process.env.RECORD_NOT_FOUND_MSG)

    if (req.body.title) foundMovie.title = req.body.title;
    if (req.body.year) foundMovie.year = req.body.year;
    if (req.body.rating) foundMovie.rating = req.body.rating;
    return foundMovie.save();
}
// 6
const partialMovieUpdate = function (req, res) {
    const movieId = req.params.id;
    const response = {};

    Movie.findById(movieId)
        .exec()
        .then((foundMovie) => _savePartialData(req, foundMovie, response))
        .then((updatedMovie) => utils._assignResponse(response, process.env.STATUS_OK, updatedMovie))
        .catch((err) => utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, process.env.STATUS_ERROR_UPDATE))
        .finally(() => utils._sendResponse(res, response));
}

const getTotalNumberOfMovies = function (req, res) {
    //    console.log("Search String:", req.query.search);

    const response = {};
    const searchQuery = { title: { $regex: '.*' + req.query.search + '.*', $options: 'i' } };
    Movie.countDocuments(searchQuery)
        .then((total) => utils._assignResponse(response, process.env.STATUS_OK, total))
        .catch((err) => utils._assignResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(() => utils._sendResponse(res, response));
}

module.exports = {
    getAllMovies: getAllMovies,
    getById: getById,
    createMovie: createMovie,
    deleteMovie: deleteMovie,
    updateMovieFull: updateMovieFull,
    partialMovieUpdate: partialMovieUpdate,
    getTotalNumberOfMovies: getTotalNumberOfMovies,
    searchMovies: searchMovies
}