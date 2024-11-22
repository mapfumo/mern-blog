const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const posts = require("./postRoutes"); // equal to the entire routes in the postRoutes.js file

const app = express();
const PORT = 3000;

app.use(cors()); // use because our app is hosted accross different domains
app.use(express.json()); // tells express to parse incoming requests as json so we don't call cors.json() each time we make a request
app.use(posts);

app.listen(PORT, () => {
  connect.connectToServer();
  console.log(`Server is running on port ${PORT}`);
});
