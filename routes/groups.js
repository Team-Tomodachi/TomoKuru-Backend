const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/", async (req, res) => {
  // #swagger.tags = ["Groups"]
  try {
    const { limit, query, tag } = req.query;
    const groupsDetails = await db("groups").select("*").timeout(1500);
    //add all of the tags for the groups as well
    let filteredGroups = groupsDetails;
    if (limit) {
      filteredGroups = filteredGroups.slice(0, limit);
    }
    if (query) {
      filteredGroups = filteredGroups.filter((group) => {
        return (
          group.group_name.toLowerCase().indexOf(`${query}`) !== -1 ||
          group.group_description.toLowerCase().indexOf(`${query}`) !== -1
        );
      });
    }
    if (tag) {
      const groupWithTag = await db("group_tags as gt")
        .join("tags as t", "gt.tag_id", "=", "t.id")
        .where("t.tag", tag)
        .select("gt.group_id");
      const groupWithTagARR = [];
      groupWithTag.map((group) => {
        groupWithTagARR.push(group.group_id);
      });
      filteredGroups = filteredGroups.filter((group) => {
        return groupWithTagARR.indexOf(`${group.id}`) !== -1;
      });
    }
    res.send(filteredGroups).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
});

router.get("/:user_id", async (req, res) => {
  // #swagger.tags = ["Groups"]
  const { user_id } = req.params;
  try {
    const groups = await db("groups")
      .where("user_id", user_id)
      .select(
        "id",
        "user_id",
        "group_name",
        "group_description",
        "private",
        "photo_url"
      );
    res.send(groups).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/getname/:group_id", async (req, res) => {
  // #swagger.tags = ["Groups"]
  const { group_id } = req.params;
  try {
    const groupDetails = await db("groups")
      .where("id", group_id)
      .select("id", "group_name");
    res.send(groupDetails).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/singlegroup/:group_id", async (req, res) => {
  // #swagger.tags = ["Groups"]
  const { group_id } = req.params;
  try {
    const group = await db("groups")
      .where("group_id", group_id)
      .join("users", "groups.user_id", "=", "users.id")
      .select(
        "id",
        "user_id",
        "first_name",
        "group_name",
        "group_description",
        "private",
        "photo_url"
      );
    const groupTags = await db("group_tags")
      .where("group_tags.group_id", group_id)
      .join("tags", "group_tags.tag_id", "=", "tags.id")
      .select("tags.tag");
    const tagArr = [];
    groupTags.map((element) => {
      tagArr.push(element.tag);
    });
    const result = {
      ...group,
      tags: tagArr,
    };
    res.send(result).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.post("/", async (req, res) => {
  // #swagger.tags = ["Groups"]
  const { group_name, group_description, user_id, private, photo_url, tag_id } =
    req.body;
  const newGroup = {
    group_name: group_name,
    group_description: group_description,
    user_id: user_id,
    private: private,
    photo_url: photo_url || "",
  };
  try {
    const group_id = await db("groups").insert(newGroup).returning("id");
    await db("group_tags").insert({
      group_id: group_id[0].id,
      tag_id: tag_id,
    });
    res.status(204).end();
  } catch (err) {
    res.send(err).status(500);
  }
});

router.patch("/:group_id/privacy", async (req, res) => {
  // #swagger.tags = ["Groups"]
  const { group_id } = req.params;
  try {
    await db("groups").where("id", group_id).update({ private: true });
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.patch("/:group_id", async (req, res) => {
  // #swagger.tags = ["Groups"]
  const { group_id } = req.params;
  const edits = req.body;
  try {
    await db("groups").where("id", group_id).update(edits);
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.delete("/:group_id", async (req, res) => {
  // #swagger.tags = ["Groups"]
  const { group_id } = req.params;

  try {
    await db("groups").where("id", group_id).del();
    res.status(204).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/usermembership/:user_id", async (req, res) => {
  // #swagger.tags = ["Groups"]
  const { user_id } = req.params;
  try {
    const groupList = await db("group_members")
      .where("group_members.user_id", user_id)
      .join("groups", "group_members.group_id", "=", "groups.id")
      .select("groups.group_name", "group_members.group_id");
    res.send(groupList).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
});

router.post("/members/:group_id/:user_id", async (req, res) => {
  // #swagger.tags = ["Groups_Members"]
  const { group_id, user_id } = req.params;
  const newMember = {
    group_id: group_id,
    user_id: user_id,
  };
  try {
    await db("group_members").insert(newMember);
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/members/:group_id", async (req, res) => {
  // #swagger.tags = ["Groups_Members"]
  const { group_id } = req.params;
  try {
    const members = await db("group_members")
      .where("group_id", group_id)
      .join("users", "group_members.user_id", "=", "users.id")
      .select(
        "group_members.group_id",
        "group_members.user_id",
        "users.first_name"
      );
    res.send(members).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.delete("/members/:group_id/:member_id", async (req, res) => {
  // #swagger.tags = ["Groups_Members"]
  const { group_id, member_id } = req.params;
  const member = {
    group_id: group_id,
    user_id: member_id,
  };

  try {
    await db("group_members").where(member).delete();
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/usergroups/:user_id", async (req, res) => {
  // #swagger.tags = ["Groups"]
  const { user_id } = req.params;
  try {
    const members = await db("group_members")
      .where("user_id", user_id)
      .select("*");
    res.send(members).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/messages/:group_id", async (req, res) => {
  // #swagger.tags = ["Groups_Messages"]
  const { group_id } = req.params;
  try {
    const messages = await db("group_messages")
      .where("group_id", group_id)
      .select("*");
    res.send(messages).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.post("/messages/:group_id", async (req, res) => {
  // #swagger.tags = ["Groups_Messages"]
  const { group_id } = req.params;
  const { user_id, message } = req.body;
  const now = new Date().toString();
  const newMessage = {
    group_id: group_id,
    user_id: user_id,
    message: message,
    date: now,
  };
  try {
    await db("group_messages").insert(newMessage);
    res.status(200).end();
  } catch (err) {
    res.send(err).status(500);
  }
});

module.exports = router;
