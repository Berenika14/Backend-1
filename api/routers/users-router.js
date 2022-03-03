//Dependencies
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Models
const Users = require("../models/users-model");

//MiddleWares
const {
  checkIfUsernameExists,
  validateBody,
  checkIfEmailExists,
  FindUserByUsername,
  validateLoginBody,
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

router.post(
  "/login",
  validateLoginBody,
  FindUserByUsername,
  (req, res, next) => {
    if (bcrypt.compareSync(req.body.password, req.dbUser.password)) {
      const payload = {
        id: req.dbUser.id,
        username: req.dbUser.password,
      };
      const token = jwt.sign(payload, "any random character", {
        expiresIn: "365d",
      });
      const outcome = {
        message: `Welcome ${req.dbUser.username} 👋 `,
        token,
      };
      res.status(200).json(outcome);
    } else {
      next();
    }
  }
);

module.exports = router;
