const mongoose = require('mongoose');

const actorScame = mongoose.Schema({
    actor: String,
    debut_year: Number
});

module.exports = actorScame;