/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("packages", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("venue_id")
      .references("id")
      .inTable("venues")
      .onDelete("CASCADE");
    table.string("page_name").notNullable();
    table.integer("package_per_person_cost").notNullable();
    table.integer("duration(minutes)").notNullable();
    table.integer("maximum_number_of_people").notNullable();
    table.string("picture_url");
    table.string("other_notes");
    table.string("drinks");
    table.string("food");
    table.string("description");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("packages");
};
