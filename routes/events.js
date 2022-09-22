const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

const nullVenueID = "298e1689-c6c9-4c22-adad-97fce8604d6f";

//build API for GET all events where user is an attendee

router.get("/", async (req, res) => {
  // #swagger.tags = ["Events"]
  try {
    const events = await db("events")
      .whereNot("venue_id", nullVenueID)
      .join("groups", "events.group_id", "=", "groups.id")
      .join("venues", "events.venue_id", "=", "venues.id")
      .join("users", "events.user_id", "=", "users.id")
      .select(
        "events.id",
        "events.name",
        "events.description",
        "events.date",
        "events.start_time",
        "events.end_time",
        "events.capacity",
        "events.venue_id",
        "venues.location_name",
        "events.user_id",
        "users.first_name",
        "users.email",
        "events.group_id",
        "groups.group_name",
        "events.photo_url"
      )
      .timeout(1500);
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
      .join("users", "events.user_id", "=", "users.id")
      .select("*"); //user name, user id, photo_url, groupp
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
  const edits = req.body;
  try {
    await db("events").where("id", event_id).update(edits);
    const events = await db("events")
      .where("id", event_id)
      .select("*")
      .timeout(1500);
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
    photo_url
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
    photo_url: photo_url || null
  };

  try {
    await db("events").insert(newEvent);
    res.status(200).end();
  } catch (err) {
    res.send(err).status(500);
  }
});

router.get("/userattending/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    console.log(user_id);
    const eventList = await db("event_attendees")
      .where("event_attendees.user_id", user_id)
      .join("events", "event_attendees.event_id", "=", "events.id")
      .select("events.name", "event_attendees.event_id");
    console.log(` EVENT LIST => ${eventList}`);
    res.send(eventList).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
});

//API Related to Event attendees
router.get("/attendees/:event_id", async (req, res) => {
  // #swagger.tags = ["Events_Attendees"]
  const { event_id } = req.params;

  try {
    const attendeeList = await db("event_attendees")
      .where("event_id", event_id)
      .select("user_id")
      .timeout(1500);
    res.send(attendeeList).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.post("/attendees/:event_id/:attendee_id", async (req, res) => {
  // #swagger.tags = ["Events_Attendees"]
  const { event_id, attendee_id } = req.params;
  const newAttendee = {
    event_id: event_id,
    user_id: attendee_id,
  };

  try {
    await db("event_attendees").insert(newAttendee);
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.delete("/attendees/:event_id/:attendee_id", async (req, res) => {
  // #swagger.tags = ["Events_Attendees"]
  const { event_id, attendee_id } = req.params;
  const attendee = {
    event_id: event_id,
    user_id: attendee_id,
  };

  try {
    await db("event_attendees").where(attendee).delete();
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/messages/:event_id", async (req, res) => {
  // #swagger.tags = ["Events_Messages"]
  const { event_id } = req.params;
  try {
    const messages = await db("event_messages")
      .where("event_id", event_id)
      .join("users", "event_messages.user_id", "=", "users.id")
      .select(
        "event_messages.user_id",
        "users.first_name",
        "event_messages.message",
        "event_messages.date",
        "event_messages.photo_url"
      );
    res.send(messages).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.post("/messages/:event_id", async (req, res) => {
  // #swagger.tags = ["Events_Messages"]
  const { event_id } = req.params;
  const { user_id, message } = req.body;
  const now = new Date().toString();
  const newMessage = {
    event_id: event_id,
    user_id: user_id,
    message: message,
    date: now,
    photo_url: photo_url || "",
  };
  try {
    await db("event_messages").insert(newMessage);
    res.status(200).end();
  } catch (err) {
    res.send(err).status(500);
  }
});

module.exports = router;
