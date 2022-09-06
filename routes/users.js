const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");
const nanoID = require("nanoid");

/**
 * @swagger
 * /api/users:
 *    get:
 *      summary: Returns a list of all of the users
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
  try {
    const users = await db("users").select("*").timeout(1500);
    res.send(users).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

/**
 * @swagger
 * /api/users:
 *    get:
 *      summary: Returns a list of all of the users
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
router.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await db("users")
      .select(
        "email",
        "first_name",
        "account_type",
        "account_active",
        "city_ward",
        "prefecture",
        "title"
      )
      .where("email", email)
      .timeout(1500);
    res.send(user).status(204);
  } catch (err) {
    res.send(err).status(404);
  }
});

module.exports = router;

// table.string("id").primary();
// table.string("email", 32).unique().notNullable().index();
// table.string("firebase_id", 64).unique();
// table.string("account_type", 20);
// table.string("active_active", 20);
// table.string("first_name", 32);
// table.string("city_ward", 32);
// table.string("prefecture", 32);
// table.string("title", 64);
