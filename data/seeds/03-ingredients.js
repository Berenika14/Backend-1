/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("ingredients").del();
  await knex("ingredients").insert([
    { ingre_name: "sugar", recipe_id: 1 },
    { ingre_name: "ground biscuit", recipe_id: 1 },
    { ingre_name: "glazed cinnamon hazelnut", recipe_id: 1 },
    { ingre_name: "sugar", recipe_id: 2 },
    { ingre_name: "flour", recipe_id: 2 },
    { ingre_name: "chocolate chips", recipe_id: 2 },
    { ingre_name: "raw salmon", recipe_id: 3 },
    { ingre_name: "rice", recipe_id: 3 },
    { ingre_name: "avocado", recipe_id: 3 },
  ]);
};
