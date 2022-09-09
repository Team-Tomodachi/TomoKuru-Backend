const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/", async (req, res) => {
  try {
    const groups = await db("groups").select("*").timeout(1500);
    res.send(groups).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/:user_id", async (req, res) => {
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
  const { group_name, group_description, group_leader, private } = req.body;
  const newGroup = {
    group_name: group_name,
    group_description: group_description,
    user_id: group_leader,
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
  const { group_id } = req.params;
  try {
    await db("groups").where("user_id", group_id).update({ private: true });
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.post("/joingroup", async (req, res) => {
  const { group_id, user_id } = req.body;
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

module.exports = router;
