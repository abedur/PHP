const mongoose = require('mongoose');
require("../movies/movie-model");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, UseUnifiedTopology: true });

mongoose.connection.on("connected", function () {
    console.log("Mongoose connected to " + process.env.DB_NAME);
});
mongoose.connection.on("disconnected", function () {
    console.log(process.env.DISCONNECT_MSG);
});

mongoose.connection.on("error", function (error) {
    console.log(process.env.CONNECT_ERROR_MSG + error);
});

process.on('SIGINT', function () {

    mongoose.connection.close(function () {
        console.log(process.env.SIGINT_MSG);
        process.exit(0);
    });
});
process.on('SIGTERM', function () {
    console.log(process.env.SIGTERM_MSG);
    mongoose.connection.close();
    process.exit(0);
});

process.on('SIGUSER2', function () {
    console.log("Program terminated/Ctrl+c reacieved.");
    mongoose.connection.close();
    process.kill(process.pid, "SIGUSER2");
});
