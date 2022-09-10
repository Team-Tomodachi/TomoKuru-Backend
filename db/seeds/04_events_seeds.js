/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  const events = require("../../sampleData/eventData.json");
  // Deletes ALL existing entries
  await knex("events").del();

  for (const event of events) {
    await knex("events").insert({
      id: event.id,
      user_id: event.user_id,
      venue_id: event.venue_id,
      group_id: event.group_id,
      name: event.event_name,
      description: event.eventDescription,
      date: event.eventdate,
      start_time: event.eventStartTime,
      end_time: event.eventEndTime,
      capacity: event.eventCapacity,
    });
  }
};
