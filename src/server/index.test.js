const startServer = require(".");
const app = require("./server");

describe("Given a startServer function", () => {
  describe("When it's invoked and the server works", () => {
    test("Then it should resolve", () => {
      app.listen = (port, cb) => cb();

      const server = startServer(app);

      expect(server).resolves.toBe();
    });
  });

  describe("When it's invoked and the server doesn't work", () => {
    test("Then it should rejects", async () => {
      app.listen = () => ({
        on: (event, cb) => cb(new Error()),
      });

      try {
        await startServer(app);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
