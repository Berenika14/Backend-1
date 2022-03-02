/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.string("username", 60).unique().notNullable();
      tbl.string("email", 60).unique().notNullable();
      tbl.string("password", 128).notNullable();
    })
    .createTable("recipes", (tbl) => {
      tbl.increments("recipe_id");
      tbl.string("title", 60).notNullable();
      tbl.string("source", 60).notNullable();
      tbl.string("category", 60).notNullable();
      tbl.string("instructions", 200).notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("ingredients", (tbl) => {
      tbl.increments("ingre_id");
      tbl.string("ingre_name", 60).notNullable();
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  //drop tables in reverse
  return knex.schema
    .dropTableIfExists("ingredients")
    .dropTableIfExists("recipes")
    .dropTableIfExists("users");
};
