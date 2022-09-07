/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("events", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.foreign("user_id").references("users");
    table.foreign("venue_id").references("venues");
    table.string("name");
    table.string("description");
    table.string("date");
    table.string("start_time");
    table.string("end_time");
    table.integer("capacity");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("events");
};
