const database = require("./connect");
const express = require("express");
const ObjectId = require("mongodb").ObjectId;

let postRoutes = express.Router();

// CRUD Operations
// 1 - Get all posts,  2 - Get a single post,  3 - Create a new post,  4 - Update a post,  5 - Delete a post

// 1 - Get all posts
postRoutes.route("/posts").get(async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("posts").find({}).toArray();
  if (data.length > 0) {
    response.status(200).json(data);
  } else {
    throw new Error("No posts found!");
  }
});

// 2 - Get a single post
postRoutes.route("/posts/:id").get(async (request, response) => {
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
postRoutes.route("/posts").post(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    title: request.body.title,
    description: request.body.description,
    author: request.body.author,
    content: request.body.content,
    dateCreated: request.body.dateCreated,
  };
  let data = await db.collection("posts").insertOne(mongoObject);
  response.status(201).json(data);
});

// 4 - Update a post
postRoutes.route("/posts/:id").put(async (request, response) => {
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
postRoutes.route("/posts/:id").delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(request.params.id) });
  response.status(200).json(data);
});

module.exports = postRoutes;
