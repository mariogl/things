const bcrypt = require("bcrypt");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const dbConnect = require("../../db");
const User = require("../../db/models/User");
const app = require("../server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoURL = mongoServer.getUri();

  await dbConnect(mongoURL);

  await User.create({
    username: "mario",
    password: await bcrypt.hash("mario", 10),
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a POST /users/register endpoint", () => {
  const username = "luis";
  const password = "luis";

  describe("When it receives a request without password", () => {
    test("Then it should respond with a 400 status and an error", async () => {
      const { body } = await request(app)
        .post("/users/register")
        .send({ username })
        .expect(400);

      expect(body).toHaveProperty("error", true);
    });
  });

  describe("When it receives a request with valid data", () => {
    test("Then it should respond with a 201 status and user data", async () => {
      const { body } = await request(app)
        .post("/users/register")
        .send({ username, password })
        .expect(201);

      expect(body.user).toHaveProperty("id");
      expect(body.user).toHaveProperty("username", username);
    });
  });

  describe("When it receives an existing username", () => {
    test("Then it should respond with a 409 status and a 'User already exists' error", async () => {
      const { body } = await request(app)
        .post("/users/register")
        .send({ username: "mario", password: "mario" })
        .expect(409);

      expect(body).toHaveProperty("error", true);
      expect(body).toHaveProperty("message", "User already exists");
    });
  });
});
