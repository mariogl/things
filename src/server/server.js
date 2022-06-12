const express = require("express");
const morgan = require("morgan");
const { generalError, notFoundError } = require("./middlewares/errors");
const usersRouter = require("./routers/users");

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
