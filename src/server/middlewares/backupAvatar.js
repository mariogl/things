require("dotenv").config();
const debug = require("debug")("things-back:server:middlewares:backupAvatar");
const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  uploadBytes,
  ref,
  getDownloadURL,
} = require("firebase/storage");

const uploadsDirectory = "uploads";

const firebaseConfig = {
  apiKey: "AIzaSyCQFMmmYPo73c9GHErX9qCs5spmlPsSit8",
  authDomain: "things-avatars.firebaseapp.com",
  projectId: "things-avatars",
  storageBucket: "things-avatars.appspot.com",
  messagingSenderId: "478062742111",
  appId: "1:478062742111:web:50ec302d5643c6630fe9ea",
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const backupAvatar = async (req, res, next) => {
  const { file } = req;

  if (!file) {
    next();
    return;
  }

  const newFilename = `${Date.now()}-${file.originalname}`;
  const oldFilePath = path.join(uploadsDirectory, file.filename);
  const newFilePath = path.join(uploadsDirectory, newFilename);

  try {
    await fs.rename(oldFilePath, newFilePath);

    const avatarData = await fs.readFile(newFilePath);

    const storageRef = ref(storage, newFilename);
    await uploadBytes(storageRef, avatarData);
    const firebaseFileURL = await getDownloadURL(storageRef);

    req.avatar = newFilename;
    req.avatarBackup = firebaseFileURL;

    next();
  } catch (error) {
    debug(chalk.red("Error on saving the avatar file"));
    debug(chalk.red(error.message));
  }
};

module.exports = backupAvatar;
