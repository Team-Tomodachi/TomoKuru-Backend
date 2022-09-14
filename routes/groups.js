const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/", async (req, res) => {
  // #swagger.tags = ["Groups"]
  try {
    const groupsDetails = await db("groups").select("*").timout(1500);
    res.send(groupsDetails).status(200);
  } catch (err) {
    res.send(err).status(500);
  }
});

router.get("/:user_id", async (req, res) => {
  // #swagger.tags = ["Groups"]
  const { user_id } = req.params;
  try {
    const groups = await db("groups")
      .where("user_id", user_id)
      .select("id", "user_id", "group_name", "group_description", "private");
    res.send(groups).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.post("/", async (req, res) => {
  // #swagger.tags = ["Groups"]
  const { group_name, group_description, user_id, private } = req.body;
  const newGroup = {
    group_name: group_name,
    group_description: group_description,
    user_id: user_id,
    private: private,
  };
  try {
    await db("groups").insert(newGroup);
    res.status(200).end();
  } catch (err) {
    res.send(err).status(500);
  }
});

router.patch("/:group_id/privacy", async (req, res) => {
  // #swagger.tags = ["Groups"]
  const { group_id } = req.params;
  try {
    await db("groups").where("user_id", group_id).update({ private: true });
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

router.post("/:user_id/:group_id", async (req, res) => {
  // #swagger.tags = ["Groups"]
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
  // #swagger.tags = ["Groups"]
  const { group_id } = req.params;
  try {
    const members = await db("group_members")
      .where("group_id", group_id)
      .select("*");
    res.send(members).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

// Get all the groups that user joins

module.exports = router;
