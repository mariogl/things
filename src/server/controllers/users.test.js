const User = require("../../db/models/User");
const customError = require("../../utils/customError");
const { registerUser } = require("./users");

describe("Given a registerUser controller", () => {
  const req = {
    body: {
      username: "",
      password: "",
    },
  };
  const next = jest.fn();

  describe("When it's invoked with an existing username", () => {
    test("Then it should call the received next function with a 409 'User already exists' error", async () => {
      User.findOne = jest.fn().mockResolvedValue(true);
      const expectedError = customError("User already exists", 409);

      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's invoked and the user can't be created", () => {
    test("Then it should call next function with a 500 'Error on register user' error", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      User.create = jest.fn().mockRejectedValue("");
      const expectedError = customError("Error on register user", 500, "");

      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's invoked and the user is created", () => {
    test("Then it should call res.status with 201 and res.json with the new user data", async () => {
      const newUser = {
        id: 1,
        username: req.body.username,
      };
      User.findOne = jest.fn().mockResolvedValue(null);
      User.create = jest.fn().mockResolvedValue(newUser);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedStatusCode = 201;
      const expectedResponse = {
        user: newUser,
      };

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
