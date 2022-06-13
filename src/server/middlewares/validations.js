const Joi = require("joi");
const customError = require("../../utils/customError");

const userCredentialsValidation = (req, res, next) => {
  const userCredentialsSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = userCredentialsSchema.validate(req.body);

  if (error) {
    const validationError = customError("Bad request", 400, error.message);
    next(validationError);
    return;
  }
  next();
};

module.exports = {
  userCredentialsValidation,
};
