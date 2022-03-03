const db = require("../../configs/db");

async function findAll() {
  let result = await db("recipes");
  return result;
}

async function findById(id) {
  let result = await db("recipes").where("recipe_id", id);
  return result;
}

async function newRecipe(body) {
  let insert = await db("recipes").insert(body);
  let result = await findById(insert);
  return result;
}

// async function updateRecipe(id) {
//   let update = await db("recipes").where("recipe_id", id).update({body});
//   return update;
// }

module.exports = {
  findAll,
  findById,
  newRecipe,
};
