const customError = require("../../utils/customError");
const { userCredentialsValidation } = require("./validations");

describe("Given a userCredentialsValidation function", () => {
  const next = jest.fn();

  beforeEach(() => {
    next.mockReset();
  });

  describe("When it receives a valid request", () => {
    test("Then it should call next function without arguments", () => {
      const req = {
        body: {
          username: "test",
          password: "test",
        },
      };

      userCredentialsValidation(req, null, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it receives a wrong request", () => {
    test("Then it should call next function with a 400 'Bad request' error", () => {
      const req = {
        body: {
          username: "test",
        },
      };
      const expectedError = customError(
        "Bad request",
        400,
        '"password" is required'
      );

      userCredentialsValidation(req, null, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
