const express = require("express");
const morgan = require("morgan");
const compression = require('compression');
const { default: helmet } = require("helmet");
const app = express();

// Init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// Init DB

// Init router

// Handle error

module.exports = app;
