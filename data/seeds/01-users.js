/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { username: "Aaron", email: "aaron@gmail.com", password: "aaron123" },
    { username: "Nika", email: "nika@gmail.com", password: "nika123" },
    { username: "Orr", email: "Orr@gmail.com", password: "orr123" },
  ]);
};
