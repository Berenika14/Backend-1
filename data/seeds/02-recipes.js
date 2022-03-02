/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("recipes").del();
  await knex("recipes").insert([
    {
      title: "Bombica 🍬",
      source: "By Feka",
      category: "dessert",
      instructions:
        "Boil water for 10 min , mix water with the ground biscuits",
      user_id: 2,
    },
    {
      title: "Cookies 🍪",
      source: "By Melisa",
      category: "dessert",
      instructions: "Preheat oven 350℃",
      user_id: 1,
    },
    {
      title: "Sushi",
      source: "By Anthony Bourdain",
      category: "Raw Meat",
      instructions: "Roll the sushi and eat it ",
      user_id: 3,
    },
  ]);
};
