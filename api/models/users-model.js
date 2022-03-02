const db = require("../../configs/db");

function findAll() {
  return db("users");
}
const findUserById = async (user_id) => {
  let result = await db("users").where("user_id", user_id);
  return result;
};

const createUser = async (body) => {
  let result = await db("users").insert(body);
  let user = findUserById(result);
  return user;
};

module.exports = { findAll, findUserById, createUser };
