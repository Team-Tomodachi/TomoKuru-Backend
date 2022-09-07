/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("venues", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.foreign("user_id").references("users");
    table.string("location_name");
    table.string("city_ward");
    table.string("prefecture");
    table.string("phone_num");
    table.string("address");
    table.string("venue_email");
    table.string("description");
    table.integer("num_seats");
    table.string("smoking");
    table.boolean("outdoor_seating");
    table.string("venue_url");
    table.string("photo_link");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("venues");
};
