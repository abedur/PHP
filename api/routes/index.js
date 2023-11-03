const express = require('express');
const routers = express.Router();

const movieRouter = require("../movies/movie.router")
const actorRoute = require('../actors/actors.route');
const userRoute = require('../user/user.router');

routers.use("/movie", movieRouter);
routers.use("/actor", actorRoute);
routers.use("/users", userRoute);

module.exports = routers;

