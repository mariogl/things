const express = require("express");
const morgan = require("morgan");
const { generalError } = require("./middlewares/errors");

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use(generalError);

module.exports = app;
