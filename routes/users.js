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
        "title"
      )
      .first()
      .timeout(1500);
    res.send(user).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/userlogin/:email", async (req, res) => {
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
        "title"
      )
      .first()
      .timeout(1500);
    if (user.account_active !== "active") {
      res.send("This user account has been deactivated").status(400);
    }
    const groups = await db("group_members")
      .where("user_id", user.id)
      .select("*")
      .timeout(1500);

    const results = {
      user_id: user.id,
      email: user.email,
      first_name: user.first_name,
      account_type: user.account_type,
      account_active: user.account_active,
      city_ward: user.city_ward,
      prefecture: user.prefecture,
      groups: groups,
    };
    res.send(results).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

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
        "title"
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
        "contact"
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

module.exports = router;
