const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: APIs for user data
 */

/**
 * @swagger
 * /api/users:
 *    get:
 *      summary: Returns a list of all of the users
 *      tags: [Users]
 *      responses:
 *        '200':
 *          description: The list of users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $Ref: '#/components/schemas/users'
 *
 */
router.get("/", async (req, res) => {
  // #swagger.tags = ["Users"]
  try {
    const users = await db("users").select("*").timeout(1500);
    res.send(users).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

/**
 * @swagger
 * /api/users/:
 *  get:
 *    summary: Returns a user by email
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: The user email
 *    responses:
 *      '200':
 *        description: Returns a single user
 *        content:
 *          application/json:
 *            schema:
 *             type: array
 *             items:
 *              $Ref: '#/components/schemas/users'
 *      '404':
 *       description: User not found
 *
 */
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
  };
  try {
    const userID = await db("users")
      .insert(newUser)
      .returning(
        "id",
        "email",
        "first_name",
        "account_type",
        "city_ward",
        "prefecture",
        "title"
      );
    res.send(userID).status(200);
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

module.exports = router;
