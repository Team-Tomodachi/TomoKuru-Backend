const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/", async (req, res) => {
  // #swagger.tags = ["Users"]
  try {
    const users = await db("users").select("*").timeout(1500);
    res.send(users).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/:email", async (req, res) => {
  // #swagger.tags = ["Users"]
  const { email } = req.params;
  try {
    const user = await db("users")
      .where("email", email)
      .select(
        "id",
        "email",
        "first_name",
        "account_type",
        "account_active",
        "city_ward",
        "prefecture",
        "title",
        "contact",
        "photo_url",
      )
      .first()
      .timeout(1500);
    res.send(user).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

// router.get("/userlogin/:email", async (req, res) => {
//   // #swagger.tags = ["Users"]
//   const { email } = req.params;
//   try {
//     const user = await db("users")
//       .where("email", email)
//       .select(
//         "id",
//         "email",
//         "first_name",
//         "account_type",
//         "account_active",
//         "city_ward",
//         "prefecture",
//         "title",
//         "contact",
//         "photo_url"
//       )
//       .first()
//       .timeout(1500);
//     if (user.account_active !== "active") {
//       res.send("This user account has been deactivated").status(400);
//     }
//     const groups = await db("group_members")
//       .where("user_id", user.id)
//       .select("*")
//       .timeout(1500);

//     const results = {
//       user_id: user.id,
//       email: user.email,
//       first_name: user.first_name,
//       account_type: user.account_type,
//       account_active: user.account_active,
//       city_ward: user.city_ward,
//       prefecture: user.prefecture,
//       contact: user.contact,

//       groups: groups,
//     };
//     res.send(results).status(200);
//   } catch (err) {
//     res.send(err).status(404);
//   }
// });

router.get("/vendorlogin/:email", async (req, res) => {
  // #swagger.tags = ["Users"]
  const { email } = req.params;
  let venues;
  try {
    const user = await db("users")
      .where("email", email)
      .select(
        "id",
        "email",
        "first_name",
        "account_type",
        "account_active",
        "city_ward",
        "prefecture",
        "title",
        "photo_url"
      )
      .first()
      .timeout(1500);
    if (user.account_active.toLowerCase() !== "active") {
      res.send("This user account has been deactivated").status(400);
    }

    if (user.account_type.toLowerCase() === "vendor") {
      venues = await db("venues")
        .where("user_id", user.id)
        .select("*")
        .timeout(1500);
    }
    const results = {
      user_id: user.id,
      email: user.email,
      first_name: user.first_name,
      account_type: user.account_type,
      account_active: user.account_active,
      city_ward: user.city_ward,
      prefecture: user.prefecture,
      photo_url: user.photo_url,
      venues: venues ? venues : "Currently, you do not have any venues",
    };
    res.send(results).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.post("/", async (req, res) => {
  // #swagger.tags = ["Users"]
  const {
    email,
    first_name,
    firebase_id,
    account_type,
    city_ward,
    prefecture,
    title,
    contact,
    photo_url,
  } = req.body;
  const newUser = {
    account_active: "active",
    email: email,
    first_name: first_name,
    firebase_id: firebase_id,
    account_type: account_type,
    city_ward: city_ward || "",
    prefecture: prefecture || "",
    title: title || "",
    contact: contact || "",
    photo_url: photo_url || "",
  };
  try {
    await db("users").insert(newUser);
    const userDetail = await db("users")
      .where("email", email)
      .select(
        "id",
        "email",
        "first_name",
        "account_type",
        "city_ward",
        "prefecture",
        "title",
        "contact",
        "photo_url"
      );
    res.send(userDetail).status(200);
  } catch (err) {
    res.send(err).status(500);
  }
});

router.patch("/:email", async (req, res) => {
  // #swagger.tags = ["Users"]
  const { email } = req.params;
  const edits = req.body;
  try {
    await db("users").where("email", email).update(edits);
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.patch("/:email/activation", async (req, res) => {
  // #swagger.tags = ["Users"]
  const { email } = req.params;
  try {
    await db("users")
      .where("email", email)
      .update({ account_active: "inactive" });
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.delete("/:user_id", async (req, res) => {
  // #swagger.tags = ["Users"]
  const { user_id } = req.params;
  try {
    await db("users").where("id", user_id).delete();
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/:user_id/groups/creator", async (req, res) => {
  const { user_id } = req.params;

  try {
    const groups = await db("groups")
      .where("user_id", user_id)
      .select("id", "group_name", "group_description", "photo_url");
    res.send(groups).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/:user_id/groups/member", async (req, res) => {
  const { user_id } = req.params;

  try {
    const groups = await db("group_members")
      .where("user_id", user_id)
      .join("groups", "group_members.group_id", "=", "groups.id")
      .select(
        "groups.id",
        "groups.group_name",
        "groups.group_description",
        "groups.photo_url",
      );
    res.send(groups).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
});

router.get("/:user_id/events/creator", async (req, res) => {
  const { user_id } = req.params;

  try {
    const events = await db("events")
      .where("user_id", user_id)
      .select("events.id", "events.name");
    res.send(events).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/:user_id/events/attendee", async (req, res) => {
  const { user_id } = req.params;

  try {
    const events = await db("event_attendees")
      .where("user_id", user_id)
      .join("events", "event_attendees.event_id", "=", "events.id")
      .select("events.id", "events.name");
    res.send(events).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
});

module.exports = router;
