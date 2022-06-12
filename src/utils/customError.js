const customError = (customMessage, statusCode, message = "") => {
  const error = new Error(message);
  error.customMessage = customMessage;
  error.statusCode = statusCode;

  return error;
};

module.exports = customError;
