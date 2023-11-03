const mongoose = require('mongoose');
const actorScame = require('../actors/actors-model');

const movieScema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    rating: {
        type: Number,
        min: 1.00,
        max: 10.00,
        default: 1
    },
    actors: [actorScame]
});

mongoose.model(process.env.MOVIE_MODEL, movieScema, process.env.COLLECTION_MOVIES);