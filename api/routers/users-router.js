const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("../models/users-model");

const {
  checkIfUsernameExists,
  validateBody,
  checkIfEmailExists,
} = require("../middleware/users-middleware");

router.get("/", async (req, res, next) => {
  Users.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  Users.findUserById(id)
    .then((user) => {
      if (user.length > 0) {
        res.status(200).json(user);
      } else {
        next({ status: 404, message: " Username doesn't exist" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post(
  "/register",
  validateBody,
  checkIfUsernameExists,
  checkIfEmailExists,
  async (req, res, next) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 15);
    user.password = hash;
    Users.createUser(user)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        next(err);
      });
  }
);

module.exports = router;
