/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("event_attendees", function (table) {
    table
      .uuid("event_id")
      .references("id")
      .inTable("events")
      .onDelete("CASCADE");
    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("event_attendees", function (table) {
    table.foreign("event_id").references("events");
    table.foreign("user_id").references("users");
  });
};
