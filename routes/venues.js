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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const venues = await db("venues")
      .where("user_id", id)
      .select("*")
      .timeout(1500);
    res.send(venues).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/city/:city", async (req, res) => {
  const { city } = req.params;
  try {
    const venues = await db("venues")
      .where("city_ward", city)
      .select("*")
      .timeout(1500);
    res.send(venues).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/prefecture/:prefecture", async (req, res) => {
  const { prefecture } = req.params;
  try {
    const venues = await db("venues")
      .where("prefecture", prefecture)
      .select("*")
      .timeout(1500);
    res.send(venues).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const edits = req.body;
  try {
    await db("venues").where("id", id).update(edits);
    res.status(204).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db("venues").where("id", id).delete();
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

/**
 * @swagger
 * /api/venues:
 *  post:
 *    summary: Create a new venue
 *    tags: [Venues]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $Ref: '#/components/schemas/venues'
 *    responses:
 *      '200':
 *        description: The venue was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $Ref: '#/components/schemas/venues'
 *      '500':
 *         description: A server error occured
 */

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
