const User = require("../../db/models/User");
const customError = require("../../utils/customError");

const registerUser = async (req, res, next) => {
  const { username, password } = req.body;

  const userExists = await User.find({ username });

  if (userExists) {
    const error = customError("User already exists", 409);
    next(error);
    return;
  }

  try {
    const newUser = await User.create({ username, password });

    res
      .status(201)
      .json({ user: { id: newUser.id, username: newUser.username } });
  } catch (error) {
    const newError = customError(
      "Error on registering user",
      500,
      error.message
    );
    next(newError);
  }
};

module.exports = { registerUser };
