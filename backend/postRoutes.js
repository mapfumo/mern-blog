const database = require("./connect");
const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

let postRoutes = express.Router();

// CRUD Operations
// 1 - Get all posts,  2 - Get a single post,  3 - Create a new post,  4 - Update a post,  5 - Delete a post

// 1 - Get all posts
postRoutes.route("/posts").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("posts").find({}).toArray();
  if (data.length > 0) {
    response.status(200).json(data);
  } else {
    throw new Error("No posts found!");
  }
});

// 2 - Get a single post
postRoutes.route("/posts/:id").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(request.params.id) });
  if (Object.keys(data).length > 0) {
    response.status(200).json(data);
  } else {
    throw new Error("No post found!");
  }
});

// 3 - Create a new post
postRoutes.route("/posts").post(verifyToken, async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    title: request.body.title,
    description: request.body.description,
    // author: request.body.author,
    author: request.body.user._id,
    content: request.body.content,
    dateCreated: request.body.dateCreated,
  };
  let data = await db.collection("posts").insertOne(mongoObject);
  response.status(201).json(data);
});

// 4 - Update a post
postRoutes.route("/posts/:id").put(verifyToken, async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      title: request.body.title,
      description: request.body.description,
      author: request.body.author,
      content: request.body.content,
      dateCreated: request.body.dateCreated,
    },
  };
  let data = await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.status(200).json(data);
});

// 5 - Delete a post
postRoutes
  .route("/posts/:id")
  .delete(verifyToken, async (request, response) => {
    let db = database.getDb();
    let data = await db
      .collection("posts")
      .deleteOne({ _id: new ObjectId(request.params.id) });
    response.status(200).json(data);
  });

// Middleware function to verify the authentication token
function verifyToken(request, response, next) {
  // Retrieve the 'Authorization' header from the incoming request
  const authHeaders = request.headers["authorization"];

  // Extract the token from the 'Authorization' header
  // Expected format: "Bearer <token>"
  const token = authHeaders && authHeaders.split(" ")[1];

  // If no token is provided, respond with a 401 (Unauthorized) status code
  if (!token) {
    return response
      .status(401)
      .json({ message: "Authentication: No token provided" });
  }

  // Verify the token using the JWT library and the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If the token is invalid or verification fails, respond with a 403 (Forbidden) status code
    if (err) {
      return response.status(403).json({ message: "Invalid Token" });
    }

    // If the token is valid, attach the decoded user information to the request body
    request.body.user = user;

    // Call the next middleware function or route handler
    next();
  });
}

module.exports = postRoutes;
