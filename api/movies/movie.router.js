const express = require('express');

const router = express.Router();
const movieController = require('../movies/movie.controller');
const authController = require('../utils.controllers/auth.controller');

router.route('/count')
    .get(movieController.getTotalNumberOfMovies);

router.route('/search')
    .post(movieController.searchMovies)

router.route('/:id')
    .get(movieController.getById)
    .delete(authController.verifyToken, movieController.deleteMovie)
    .put(authController.verifyToken, movieController.updateMovieFull)
    .patch(authController.verifyToken, movieController.partialMovieUpdate);


router.route('/')
    .get(movieController.getAllMovies)
    .post(authController.verifyToken, movieController.createMovie);



module.exports = router;