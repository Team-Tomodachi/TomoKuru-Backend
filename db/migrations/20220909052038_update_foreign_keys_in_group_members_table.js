/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("group_members", function (table) {
    table
      .uuid("group_id")
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE");
    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("group_members", function (table) {
    table.foreign("group_id").references("groups");
    table.foreign("user_id").references("users");
  });
};
