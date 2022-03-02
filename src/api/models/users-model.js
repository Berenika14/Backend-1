const db = require("../../../data/db");

function findAll() {
  return db("users");
}

module.exports = { findAll };
