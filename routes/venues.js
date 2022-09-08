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

router.post("/", async (req, res) => {
  const {
    user_id,
    location_name,
    city_ward,
    prefecture,
    phone_num,
    address,
    venue_email,
    description,
    num_seats,
    smoking,
    outdoor_seating,
    venue_url,
    photo_link,
  } = req.body;
  const newVenue = {
    user_id: user_id,
    location_name: location_name,
    city_ward: city_ward,
    prefecture: prefecture,
    phone_num: phone_num || "",
    address: address || "",
    venue_email: venue_email || "",
    description: description || "",
    num_seats: num_seats || "",
    smoking: smoking || "",
    outdoor_seating: outdoor_seating || "",
    venue_url: venue_url || "",
    photo_link: photo_link || "",
  };
  try {
    await db("venues").insert(newVenue);
    res.status(204).end();
  } catch (err) {
    res.send(err).status(500);
  }
});

module.exports = router;
