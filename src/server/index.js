const chalk = require("chalk");

require("dotenv").config();
const debug = require("debug")("things-back:server:index");

const startServer = (app, port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.greenBright(`Server listening on port ${port}`));
      resolve();
    });

    server.on("error", (error) => {
      debug(chalk.red("Can't start the server"));
      debug(chalk.red(error.message));
      reject(error);
    });
  });

module.exports = startServer;
