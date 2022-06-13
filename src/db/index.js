require("dotenv").config();
const debug = require("debug")("things-back:db:index");
const chalk = require("chalk");
const mongoose = require("mongoose");

const dbConnect = (mongoString) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", process.env.DEBUG_MONGODB);
    mongoose.connect(mongoString, (error) => {
      if (error) {
        const dbError = new Error("Error connecting to database");
        debug(chalk.red(dbError.message));
        reject(dbError);
        return;
      }

      debug(chalk.greenBright("Connected to database"));
      resolve();
    });
  });

module.exports = dbConnect;
