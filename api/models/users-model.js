const db = require("../../configs/db");

function findAll() {
  return db("users");
}

module.exports = { findAll };
