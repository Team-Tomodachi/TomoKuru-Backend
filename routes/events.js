const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is the events end point").status(200);
});

module.exports = router;
