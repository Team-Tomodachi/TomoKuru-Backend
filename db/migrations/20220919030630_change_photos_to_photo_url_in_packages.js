/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("packages", function (table) {
    table.string("photo_url");
    table.dropColumn("picture_url");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("packages", function (table) {
    table.dropColumn("photo_url");
    table.string("picture_url");
  });
};
