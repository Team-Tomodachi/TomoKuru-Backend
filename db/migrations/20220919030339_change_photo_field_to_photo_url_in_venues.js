/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("venues", function (table) {
    table.string("photo_url");
    table.dropColumn("photo_link");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("venues", function (table) {
    table.dropColumn("photo_url");
    table.string("photo_link");
  });
};
