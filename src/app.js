require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const { default: helmet } = require("helmet");
var bodyParser = require('body-parser')
const route = require("./routes");
const app = express();

// Init middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// Init DB
require("./dbs/init.mongodb");
const { checkOverload } = require("./helpers/checkConnect");
// checkOverload();

// Init router
app.use("/", route);

// Handle error

module.exports = app;
