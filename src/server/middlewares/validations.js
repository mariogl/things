const Joi = require("joi");
const customError = require("../../utils/customError");

const newUserCredentialsValidation = (req, res, next) => {
  const newUserCredentialsSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = newUserCredentialsSchema.validate(req.body);

  if (error) {
    const validationError = customError("Bad request", 400, error.message);
    next(validationError);
    return;
  }
  next();
};

module.exports = {
  newUserCredentialsValidation,
};
