const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is the venues end point").status(200);
});

module.exports = router;
