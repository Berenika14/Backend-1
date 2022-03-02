const express = require("express");
const UsersRouter = require("./routers/users-router");
const server = express();
server.use(express.json());

server.use("/api/users", UsersRouter);
server.get("/", (req, res) => res.json("Ok!"));

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
