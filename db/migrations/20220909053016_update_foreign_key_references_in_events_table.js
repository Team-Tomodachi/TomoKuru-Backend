/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("events", function (table) {
    table
      .uuid("venue_id")
      .references("id")
      .inTable("venues")
      .onDelete("CASCADE");
    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("events", function (table) {
    table.foreign("venue_id").references("venues");
    table.foreign("user_id").references("users");
  });
};
