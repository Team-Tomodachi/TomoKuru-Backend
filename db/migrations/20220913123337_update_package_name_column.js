/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("packages", function (table) {
    table.dropColumn("page_name");
    table.string("package_name").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("packages", function (table) {
    table.string("page_name").notNullable();
    table.dropColumn("package_name");
  });
};
