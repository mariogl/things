require("dotenv").config();
const debug = require("debug")("things-back:server:middlewares:errors");
const chalk = require("chalk");
const customError = require("../../utils/customError");

const notFoundError = (req, res, next) => {
  const error = customError("Endpoint not found", 404);

  next(error);
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  debug(chalk.red(error.message));
  const statusCode = error.statusCode ?? 500;
  const messageError = error.customMessage ?? "Server error";

  res.status(statusCode).json({ error: true, message: messageError });
};

module.exports = {
  notFoundError,
  generalError,
};
