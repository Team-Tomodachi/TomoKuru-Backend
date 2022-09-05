const express = require("express");
const router = express.Router();

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
router.get("/", (req, res) => {
  res.send("this is the user end point").status(200);
});

module.exports = router;
