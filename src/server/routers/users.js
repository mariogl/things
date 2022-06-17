const express = require("express");
const multer = require("multer");
const { registerUser, loginUser } = require("../controllers/users");
const backupAvatar = require("../middlewares/backupAvatar");
const { userCredentialsValidation } = require("../middlewares/validations");

const usersRouter = express.Router();

const upload = multer({ dest: "uploads/" });

usersRouter.post(
  "/register",
  upload.single("avatar"),
  userCredentialsValidation,
  backupAvatar,
  registerUser
);
usersRouter.post("/login", userCredentialsValidation, loginUser);

module.exports = usersRouter;
