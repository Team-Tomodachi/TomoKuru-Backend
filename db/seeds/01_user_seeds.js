/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: "0873a1d2-91cf-464b-b194-29d681bebf5b",
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
      id: "29f41b8f-1f6f-4e32-9623-d48acd5578ed",
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
      id: "2094584d-5818-4a02-88c2-02f9129429a9",
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
      id: "97e55e28-0599-42d6-95d4-6cfb20827548",
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
      id: "bccaaf5c-779a-4254-94d9-33edc64c93f7",
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
