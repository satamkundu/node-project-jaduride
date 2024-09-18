const winston = require("winston");
const express = require("express");
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000;

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/socket_server")

const server = app.listen(port, () =>
    winston.info(`Listening on port ${port}...`)
);

module.exports = server;