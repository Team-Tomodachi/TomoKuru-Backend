const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

const nullVenueID = "298e1689-c6c9-4c22-adad-97fce8604d6f";

router.get("/", async (req, res) => {
  // #swagger.tags = ["Events"]
  try {
    const events = await db("events").select("*").timeout(1500);
    res.send(events).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

//Get Events without Venues
router.get("/noVenues/", async (req, res) => {
  // #swagger.tags = ["Events"]
  try {
    const events = await db("events")
      .where("venue_id", nullVenueID)
      .select("*");
    res.send(events).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

//Get Events By USER Owner
router.get("/user/:user_id", async (req, res) => {
  // #swagger.tags = ["Events"]
  const { user_id } = req.params;
  try {
    const events = await db("events").where("user_id", user_id).select("*");
    res.send(events).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

//Get Events by Venue
router.get("/venue/:venue_id", async (req, res) => {
  // #swagger.tags = ["Events"]
  const { venue_id } = req.params;
  try {
    const events = await db("events").where("venue_id", venue_id).select("*");
    res.send(events).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.patch("/:event_id", async (req, res) => {
  // #swagger.tags = ["Events"]
  const { event_id } = req.params;
  const { edits } = req.body;
  try {
    const events = await db("events")
      .where("id", event_id)
      .update(edits)
      .returning("*");
    res.send(events).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.delete("/:event_id", async (req, res) => {
  // #swagger.tags = ["Events"]
  const { event_id } = req.params;
  try {
    await db("events").where("id", event_id).delete();
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.post("/", async (req, res) => {
  // #swagger.tags = ["Events"]
  const {
    user_id,
    venue_id,
    name,
    description,
    date,
    start_time,
    end_time,
    capacity,
  } = req.body;
  const newEvent = {
    user_id: user_id,
    venue_id: venue_id || nullVenueID,
    name: name,
    description: description,
    date: date,
    start_time: start_time,
    end_time: end_time || "",
    capacity: capacity || 0,
  };
  try {
    const event = await db("events").insert(newEvent);
    res.status(200).end();
  } catch (err) {
    res.send(err).status(500);
  }
});

module.exports = router;
