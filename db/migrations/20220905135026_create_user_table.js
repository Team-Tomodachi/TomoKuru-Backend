/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("email", 32).unique().notNullable().index();
    table.string("firebase_id", 64).unique();
    table.string("account_type", 20);
    table.string("account_active", 20);
    table.string("first_name", 32);
    table.string("city_ward", 32);
    table.string("prefecture", 32);
    table.string("title", 64);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
