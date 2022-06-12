const express = require("express");
const { registerUser } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);

module.exports = usersRouter;
