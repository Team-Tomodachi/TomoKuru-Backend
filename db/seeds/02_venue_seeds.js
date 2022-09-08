/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  const venues = require("../../sampleData/venueData.json");
  // Deletes ALL existing entries
  await knex("venues").del();

  for (const venue of venues) {
    await knex("venues").insert({
      user_id: venue.user_id,
      location_name: venue.venueName,
      venue_type: venue.venueType,
      address: venue.venueAddress,
      phone_num: venue.venueContact,
      description: venue.venueDescription,
      num_seats: venue.venueCapacity,
    });
  }
};
