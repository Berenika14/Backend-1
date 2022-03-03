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

const findUsername = async (username) => {
  let result = await db("users").where("username", username);
  return result[0];
};
const findEmail = async (email) => {
  let result = await db("users").where("email", email);
  return result[0];
};

module.exports = { findAll, findUserById, createUser, findUsername, findEmail };
