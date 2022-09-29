const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

const contactForMore = "Please contact the venue for further details.";

router.get("/", async (req, res) => {
  // #swagger.tags = ["Venues"]
  try {
    const { limit, query, location, smoking, outdoor, capacity } = req.query;
    const venues = await db("venues").select("*").timeout(1500);
    let filteredVenues = venues;
    if (limit) {
      filteredVenues = filteredVenues.slice(0, limit);
    }
    if (query) {
      filteredVenues = filteredVenues.filter((venue) => {
        return (
          venue.location_name.toLowerCase().indexOf(`${query}`) !== -1 ||
          venue.description.toLowerCase().indexOf(`${query}`) !== -1
        );
      });
    }
    if (location) {
      filteredVenues = filteredVenues.filter((venue) => {
        return (
          venue.city_ward.toLowerCase().indexOf(`${location}`) !== -1 ||
          venue.prefecture.toLowerCase().indexOf(`${location}`) !== -1 ||
          venue.address.toLowerCase().indexOf(`${location}`) !== -1
        );
      });
    }
    if (smoking) {
      filteredVenues = filteredVenues.filter((venue) => {
        return venue.smoking === smoking;
      });
    }
    if (outdoor) {
      filteredVenues = filteredVenues.filter((venue) => {
        return venue.outdoor_seating === !!outdoor;
      });
    }
    if (capacity) {
      filteredVenues = filteredVenues.filter((venue) => {
        return capacity <= venue.num_seats;
      });
    }
    res.send(filteredVenues).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/:id", async (req, res) => {
  // #swagger.tags = ["Venues"]
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

router.get("/getdetails/:venue_id", async (req, res) => {
  // #swagger.tags = ["Venues"]
  const { venue_id } = req.params;
  try {
    const groupDetails = await db("venues")
      .where("id", venue_id)
      .select("id", "location_name", "city_ward", "prefecture", "photo_url");
    res.send(groupDetails).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/city/:city", async (req, res) => {
  // #swagger.tags = ["Venues"]
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
  // #swagger.tags = ["Venues"]
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
  // #swagger.tags = ["Venues"]
  const { id } = req.params;
  const edits = req.body;
  try {
    await db("venues").where("id", id).update(edits);
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.delete("/:id", async (req, res) => {
  // #swagger.tags = ["Venues"]
  const { id } = req.params;
  try {
    await db("venues").where("id", id).delete();
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.post("/", async (req, res) => {
  // #swagger.tags = ["Venues"]
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
    photo_url,
    venue_type,
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
    num_seats: num_seats || 0,
    smoking: smoking || "",
    outdoor_seating: outdoor_seating || false,
    venue_url: venue_url || "",
    photo_url: photo_url || "",
    venue_type: venue_type || "",
  };
  try {
    await db("venues").insert(newVenue);
    res.status(200).end();
  } catch (err) {
    res.send(err).status(500);
  }
});

router.post("/package/", async (req, res) => {
  // #swagger.tags = ["Venues"]
  const {
    venue_id,
    package_name,
    package_per_person_cost,
    duration,
    maximum_number_of_people,
    photo_url,
    other_notes,
    drinks,
    food,
    description,
  } = req.body;
  const newPackage = {
    venue_id: venue_id,
    package_name: package_name,
    package_per_person_cost: package_per_person_cost,
    duration: duration,
    maximum_number_of_people: maximum_number_of_people,
    photo_url: photo_url || "",
    other_notes: other_notes || "",
    drinks: drinks || contactForMore,
    food: food || contactForMore,
    description: description || contactForMore,
  };
  try {
    await db("packages").insert(newPackage);
    res.status(200).end();
  } catch (err) {
    res.send(err).status(500);
  }
});

router.get("/packages/:venue_id", async (req, res) => {
  // #swagger.tags = ["Venues"]
  const { venue_id } = req.params;
  try {
    const packages = await db("packages")
      .where("venue_id", venue_id)
      .select("*")
      .timeout(1500);
    res.send(packages).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.delete("/packages/:package_id", async (req, res) => {
  // #swagger.tags = ["Venues"]
  const { package_id } = req.params;
  try {
    await db("packages").where("id", package_id).delete();
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

router.patch("/packages/:package_id", async (req, res) => {
  // #swagger.tags = ["Venues"]
  const { package_id } = req.params;
  const edits = req.body;
  try {
    await db("packages").where("id", package_id).update(edits);
    res.status(200).end();
  } catch (err) {
    res.send(err).status(404);
  }
});

module.exports = router;
