/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("group_messages", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("group_id")
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE")
      .notNullable();
    table
      .uuid("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();
    table.string("message");
    table.string("date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("group_messages");
};
