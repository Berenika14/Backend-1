const Users = require("../models/users-model");

async function validateBody(req, res, next) {
  if (!req.body || typeof req.body !== "object") {
    return next({ status: 400, message: "Request.body is not an object!" });
  }
  const { username, password, email } = req.body;
  try {
    if (!username || !password || !email || password.length < 3) {
      let message = "You forgot providing username";
      if (!password) {
        message = "You forgot to provide password";
      } else if (!email) {
        message = "You Forgot to provide email";
      } else if (password.length < 3) {
        message = "Password should be more than 5 characters";
      }
      next({ status: 400, message });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function checkIfUsernameExists(req, res, next) {
  try {
    let result = await Users.findUsername(req.body.username);
    if (result) {
      next({ status: 400, message: "Username already exists" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function checkIfEmailExists(req, res, next) {
  try {
    let result = await Users.findEmail(req.body.email);
    if (result) {
      next({ status: 400, message: "Email already exists" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function FindUserByUsername(req, res, next) {
  Users.findUsername(req.body.username).then((user) => {
    if (user) {
      req.dbUser = user;
      next();
    } else {
      next({ status: 400, message: " Invalid Username" });
    }
  });
}

module.exports = {
  checkIfUsernameExists,
  validateBody,
  checkIfEmailExists,
  FindUserByUsername,
};
