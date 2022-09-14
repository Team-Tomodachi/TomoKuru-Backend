/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("packages", function (table) {
    table.dropColumn("duration(minutes)");
    table.integer("duration").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("packages", function (table) {
    table.integer("duration(minutes)").notNullable();
    table.dropColumn("duration");
  });
};
