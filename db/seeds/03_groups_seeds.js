/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  const groups = require("../../sampleData/groupsData.json");
  // Deletes ALL existing entries
  await knex("groups").del();

  for (const group of groups) {
    await knex("groups").insert({
      id: group.id,
      user_id: group.user_id,
      group_name: group.groupName,
      group_description: group.groupDescription,
      private: group.isPrivate === "public" ? false : true,
      members_num: group.groupMemberCount,
    });
  }
};
