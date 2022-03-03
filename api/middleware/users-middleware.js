const Users = require("../models/users-model");

async function validateBody(req, res, next) {
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

module.exports = { checkIfUsernameExists, validateBody, checkIfEmailExists };
