require("dotenv").config();
const debug = require("debug")("things-back:index");
const chalk = require("chalk");
const dbConnect = require("./db");
const startServer = require("./server");
const app = require("./server/server");

(async () => {
  try {
    const mongoURL = process.env.MONGO_URL;
    await dbConnect(mongoURL);

    const port = process.env.port || 4000;
    await startServer(app, port);
  } catch (error) {
    debug(chalk.red("Exiting"));
    process.exit(1);
  }
})();
