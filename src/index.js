require("dotenv").config();
const debug = require("debug")("things-back:index");
const chalk = require("chalk");
const dbConnect = require("./db");

(async () => {
  try {
    await dbConnect(process.env.MONGO_URL);
  } catch (error) {
    debug(chalk.red("Exiting"));
    process.exit(1);
  }
})();
