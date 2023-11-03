const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
//require('./api/data/dbconnection').open();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./api/db/db');

//INCLUDED ROUTES
const routes = require('./api/routes');

//USING TO SEE LOGS
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, process.env.PUBLIC)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, authorization, X-Requested-With, Content-Type, Accept');

    next();
});

app.use('/api', routes);

//SERVER
const server = app.listen(process.env.PORT, function () {
    console.log(process.env.RUNNING_PORT + ' ' + server.address().port)
});
