require("dotenv").config();
const debug = require("debug")("things-back:server:controllers:users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const User = require("../../db/models/User");
const customError = require("../../utils/customError");

const registerUser = async (req, res, next) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    const error = customError("User already exists", 409);
    next(error);
    return;
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: encryptedPassword,
    });

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

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw customError("Wrong credentials", 403, "Username not found");
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      throw customError("Wrong credentials", 403, "Wrong password");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const updateUserAvatar = async (req) => {
  const { userId, avatar, avatarBackup } = req;

  try {
    await User.findByIdAndUpdate(userId, {
      avatar,
      avatarBackup,
    });
  } catch (error) {
    debug(chalk.red("Error on updating the user's avatar"));
    debug(chalk.red(error.message));
  }
};

module.exports = { registerUser, loginUser, updateUserAvatar };
