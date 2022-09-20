const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/", async (req, res) => {
  // #swagger.tags = ["Tags"]
  try {
    const tags = await db("tags").select("*").timeout(1500);
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
      .where("user_tags.user_id", user_id)
      .join("tags", "user_tags.tag_id", "=", "tags.id")
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
      .where("group_tags.group_id", group_id)
      .join("tags", "group_tags.tag_id", "=", "tags.id")
      .select("tags.tag");
    const tagArr = [];
    groupTags.map((element) => {
      tagArr.push(element.tag);
    });
    res.send(tagArr).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

//Add new tags  to tag table
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

router.post("/users/:user_id", async (req, res) => {
  // #swagger.tags = ["Tags"]
  const { user_id } = req.params;
  const { tag } = req.body;
  try {
    const tagExists = await db("tags")
      .where("tag", tag)
      .select("*")
      .first()
      .timeout(1500);
    if (tagExists) {
      const tagInsert = {
        user_id: user_id,
        tag_id: tagExists.id,
      };
      await db("user_tags").insert(tagInsert);
      res.status(200).end();
    } else {
      res.send("Tag does not exist, please create new tag").status(404);
    }
  } catch (err) {
    res.send(err).status(404);
  }
});

router.post("/groups/:group_id", async (req, res) => {
  // #swagger.tags = ["Tags"]
  const { group_id } = req.params;
  const { tag } = req.body;
  try {
    const tagExists = await db("tags")
      .where("tag", tag)
      .select("*")
      .first()
      .timeout(1500);
    if (tagExists) {
      const tagInsert = {
        group_id: group_id,
        tag_id: tagExists.id,
      };
      await db("group_tags").insert(tagInsert);
      res.status(200).end();
    } else {
      res.send("Tag does not exist, please create new tag").status(404);
    }
  } catch (err) {
    res.send(err).status(404);
  }
});

module.exports = router;
