const router = require("express").Router();
const Users = require("../models/users-model");

router.get("/", async (req, res, next) => {
  Users.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
