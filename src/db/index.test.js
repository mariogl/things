const mongoose = require("mongoose");
const dbConnect = require(".");

describe("Given a dbConnect function", () => {
  describe("When it's invoked with a correct mongo URL", () => {
    test("Then it should resolve", () => {
      mongoose.connect = (url, cb) => {
        cb(null);
      };

      const connection = dbConnect();

      expect(connection).resolves.toBe();
    });
  });

  describe("When it's invoked with a wrong mongo URL", () => {
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
