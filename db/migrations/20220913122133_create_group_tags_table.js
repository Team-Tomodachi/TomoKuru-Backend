/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("group_tags", function (table) {
    table
      .integer("tag_id")
      .references("id")
      .inTable("tags")
      .onDelete("CASCADE")
      .notNullable();
    table
      .uuid("group_id")
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE")
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("group_tags");
};
