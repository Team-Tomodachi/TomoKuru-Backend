const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/", async (req, res) => {
  // #swagger.tags = ["Tags"]
  try {
    const tags = await db("tags").select("*").timout(1500);
    res.send(tags).status(200);
  } catch (err) {
    res.send(err).status(500);
  }
});

router.get("/users/:user_id", async (req, res) => {
  // #swagger.tags = ["Tags"]
  const { user_id } = req.params;
  try {
    const userTags = await db("user_tags")
      .join("tags", "tags.id", "user_tags.tag_id")
      .where("user_tags.user_id", user_id)
      .select("tags.tag");
    res.send(userTags).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/groups/:group_id", async (req, res) => {
  // #swagger.tags = ["Tags"]
  const { group_id } = req.params;
  try {
    const groupTags = await db("group_tags")
      .join("tags", "tags.id", "group_tags.tag_id")
      .where("group_tags.group_id", group_id)
      .select("tags.tag");
    res.send(groupTags).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.post("/", async (req, res) => {
  // #swagger.tags = ["Tags"]
  const body = req.body;
  try {
    if (Array.isArray(body)) {
      body.map(async (tag) => {
        await db("tags").insert(tag);
      });
    } else {
      await db("tags").insert(body);
    }
    res.status(200).end();
  } catch (err) {
    res.send(err).status(500);
  }
});

module.exports = router;
