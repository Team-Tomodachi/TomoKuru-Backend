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
