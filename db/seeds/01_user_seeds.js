/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      email: "soccerGuySteve88@gmail.com",
      firebase_id: "123456",
      account_type: "user",
      account_active: "active",
      first_name: "Steve",
      city_ward: "Tokyo",
      prefecture: "Kanto",
      title: "Soccer Fan",
    },
    {
      email: "JayJayJay@gmail.com",
      firebase_id: "456123",
      account_type: "vendor",
      account_active: "active",
      first_name: "Jay",
      city_ward: "Tokyo",
      prefecture: "Kanto",
      title: "Cool Guy",
    },
    {
      email: "Harry@potter.net",
      firebase_id: "345612",
      account_type: "user",
      account_active: "active",
      first_name: "Jay",
      city_ward: "Hitoyoshi",
      prefecture: "Kumamoto",
      title: "Cool Guy",
    },
    {
      email: "Mick_e@mouse.com",
      firebase_id: "345789",
      account_type: "vendor",
      account_active: "active",
      first_name: "Mickey",
      city_ward: "Asahikawa",
      prefecture: "Hokkaido",
      title: "Mouse Tycoon",
    },
    {
      email: "Dorae@mon.com",
      firebase_id: "789123",
      account_type: "user",
      account_active: "active",
      first_name: "Doraemon",
      city_ward: "Tokyo",
      prefecture: "Tokyo",
      title: "Cat",
    },
  ]);
};
