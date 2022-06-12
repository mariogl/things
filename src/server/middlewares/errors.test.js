const { generalError } = require("./errors");

describe("Given a generalError function", () => {
  describe("When it's invoked", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    describe("And it receives an error with custom message and status code", () => {
      test("Then it should invoke res.status with status code and res.json with the message", () => {
        const error = new Error();
        error.customMessage = "Custom error message";
        error.statusCode = 400;

        const expectedResponse = {
          error: true,
          message: error.customMessage,
        };

        generalError(error, null, res);

        expect(res.status).toHaveBeenCalledWith(error.statusCode);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
      });
    });

    describe("And it receives an error without custom message nor status code", () => {
      test("Then it should invoke res.status with 500 and res.json with message 'Server error'", () => {
        const error = new Error();
        const expectedStatusCode = 500;
        const expectedResponse = {
          error: true,
          message: "Server error",
        };

        generalError(error, null, res);

        expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
      });
    });
  });
});
