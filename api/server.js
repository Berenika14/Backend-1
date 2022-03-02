const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const UsersRouter = require("./routers/users-router");
const recipeRouter = require("./routers/recipes-router");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/recipes", recipeRouter);

server.use("/api/users", UsersRouter);

server.get("/", (req, res) => res.json("Ok!"));
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
