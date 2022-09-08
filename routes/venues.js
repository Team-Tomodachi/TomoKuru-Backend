const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: APIs for venue data
 */

/**
 * @swagger
 * /api/venues:
 *    get:
 *      summary: Returns a list of all of the venues
 *      tags: [Venues]
 *      responses:
 *        '200':
 *          description: The list of venues
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $Ref: '#/components/schemas/venues'
 *
 */
router.get("/", async (req, res) => {
  try {
    const venues = await db("venues").select("*").timeout(1500);
    res.send(venues).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.post("/", async (req, res) => {
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
    await db("users").insert(newUser);
    res.status(204).end();
  } catch (err) {
    res.send(err).status(500);
  }
});

module.exports = router;
