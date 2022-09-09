/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("events", function (table) {
    table
      .uuid("group_id")
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("events", function (table) {
    table.dropColumn("group_id");
  });
};
