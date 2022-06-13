const express = require("express");
const { registerUser } = require("../controllers/users");
const { newUserCredentialsValidation } = require("../middlewares/validations");

const usersRouter = express.Router();

usersRouter.post("/register", newUserCredentialsValidation, registerUser);

module.exports = usersRouter;
