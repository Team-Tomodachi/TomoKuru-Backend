const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is the user end point").status(200);
});

module.exports = router;
