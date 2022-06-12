const mongoose = require("mongoose");
const dbConnect = require(".");

describe("Given a dbConnect function", () => {
  describe("When it's invoked and the connection works", () => {
    test("Then it should resolve", () => {
      mongoose.connect = (url, cb) => {
        cb(null);
      };

      const connection = dbConnect();

      expect(connection).resolves.toBe();
    });
  });

  describe("When it's invoked and the connection doesn't work", () => {
    test("Then it should resolve", async () => {
      mongoose.connect = (url, cb) => {
        cb(new Error());
      };

      try {
        await dbConnect();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
