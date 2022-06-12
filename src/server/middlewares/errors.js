// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  const statusCode = error.statusCode ?? 500;
  const messageError = error.customMessage ?? "Server error";

  res.status(statusCode).json({ error: true, message: messageError });
};

module.exports = {
  generalError,
};
