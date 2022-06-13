const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../db/models/User");
const customError = require("../../utils/customError");
const { registerUser, loginUser } = require("./users");

const next = jest.fn();

beforeEach(() => {
  next.mockReset();
});

describe("Given a registerUser controller", () => {
  const req = {
    body: {
      username: "",
      password: "",
    },
  };

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

describe("Given a loginUser controller", () => {
  const req = {
    body: {
      username: "test",
      password: "test",
    },
  };

  describe("When the database gives an error", () => {
    test("Then it should call next with an error", async () => {
      User.findOne = jest.fn().mockRejectedValue();

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When the user doesn't exist", () => {
    test("Then it should call next with a 403 'Wrong credentials' error", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      const expectedError = customError(
        "Wrong credentials",
        403,
        "Username not found"
      );

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When the password is wrong", () => {
    test("Then it should call next with a 403 'Wrong credentials' error", async () => {
      User.findOne = jest.fn().mockResolvedValue(true);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const expectedError = customError(
        "Wrong credentials",
        403,
        "Wrong password"
      );

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When the credentials are OK", () => {
    test("Then it should call status with 200 and json with a token", async () => {
      const token = "token";
      User.findOne = jest.fn().mockResolvedValue(true);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(token);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedResponse = {
        token,
      };

      await loginUser(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
