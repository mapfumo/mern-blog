# MEARN Blog

This is a blog application implemented using MongoDB, Express, React, and Node.js. There are also seperate readme files for the frontend and backend.

## Backend Setup

```bash
cd backend
npm install mongodb
npm install dotenv
npm install express cors
npm install bcrypt
npm install jsonwebtoken
```

## Frontend Setup

```bash
cd frontend
npm install axios
npm install react-router-dom
npm install jsonwebtoken
```

## Files and setup quick explanation

- MongoDB database called `blogData` was setup and a collection called `posts` was created.
- postRoutes.js file contains all the routes for the backend to interact with the database.
- connect.js file contains the connection to the database.
- server.js file contains the express server and the routes.
- api.js file contains the functions that interact with functions in postRoutes.js. using `axios` data fetching library. It helps the frontend to interact with the backend.

## Security Considerations

Include the file `config.env` in your `.gitignore` file.
