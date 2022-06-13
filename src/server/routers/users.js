const express = require("express");
const { registerUser, loginUser } = require("../controllers/users");
const { userCredentialsValidation } = require("../middlewares/validations");

const usersRouter = express.Router();

usersRouter.post("/register", userCredentialsValidation, registerUser);
usersRouter.post("/login", userCredentialsValidation, loginUser);

module.exports = usersRouter;
