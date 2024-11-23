const database = require("./connect");
const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

let userRoutes = express.Router();
const SALT_ROUNDS = 10;

// CRUD Operations
// 1 - Get all users,  2 - Get a single post,  3 - Create a new post,  4 - Update a post,  5 - Delete a post

// 1 - Get all users
userRoutes.route("/users").get(async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("users").find({}).toArray();
  if (data.length > 0) {
    response.status(200).json(data);
  } else {
    throw new Error("No users found!");
  }
});

// 2 - Get a single post
userRoutes.route("/users/:id").get(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("users")
    .findOne({ _id: new ObjectId(request.params.id) });
  if (Object.keys(data).length > 0) {
    response.status(200).json(data);
  } else {
    throw new Error("No post found!");
  }
});

// 3 - Create a new post
userRoutes.route("/users").post(async (request, response) => {
  let db = database.getDb();

  // check if email already exists
  const takenEmail = await db
    .collection("users")
    .findOne({ email: request.body.email });

  if (takenEmail) {
    console.log("Email already exists");
    response.status(400).json({ message: "Email already exists" });
  } else {
    const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS);

    let mongoObject = {
      name: request.body.name,
      email: request.body.email,
      password: hash,
      joinDate: new Date(),
      posts: [],
    };
    let data = await db.collection("users").insertOne(mongoObject);
    response.status(200).json(data);
  }
});

// 4 - Update a post
userRoutes.route("/users/:id").put(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      joinDate: request.body.joinDate,
      posts: request.body.posts,
    },
  };
  let data = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.status(200).json(data);
});

// 5 - Delete a post
userRoutes.route("/users/:id").delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(request.params.id) });
  response.status(200).json(data);
});

// 6 - Login
userRoutes.route("/users/login").post(async (request, response) => {
  let db = database.getDb();

  // check if email already exists
  const user = await db
    .collection("users")
    .findOne({ email: request.body.email });

  if (user) {
    let confirmation = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (confirmation) {
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
      response.json({ success: true, token });
    } else {
      response.json({ success: false, message: "Incorrect Password!" });
    }
  } else {
    response.json({ success: false, message: "User not found!" });
  }
});

module.exports = userRoutes;
