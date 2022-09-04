const express = require("express");
const router = express.Router();
/**
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      required:
 *        - id
 *        - email
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the user
 *        email:
 *          type: string
 *          description: The user's email address
 *        account_type:
 *          type: number
 *          description: Identifies the type of account 0 = User & 2 = Vendor
 *        active_account:
 *          type: number
 *          description: Identifies if the account is active: 0 = inactive, 1 = active
 *        first_name:
 *          type: string
 *          description: User's first name
 *        city_ward:
 *          type: string
 *          description: Town of the user
 *        prefecture:
 *          type: string
 *          description: Prefecture of the user
 *        title:
 *          type: string
 *          description: Title of the user
 *      example:
 *        id: ngk389d
 *        email: john(at)example.com
 *        account_type: 0
 *        active_account: 1
 *        first_name: John
 *        city_ward: Shinjuku
 *        prefecture: Tokyo
 *        title: FullStack Developer
 */

/**
 * @swagger
 * /api/users:
 *    get:
 *      summary: Returns a list of all of the users
 *      responses:
 *        200:
 *          description: The list of users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Users'
 *
 */
router.get("/", (req, res) => {
  res.send("this is the user end point").status(200);
});

module.exports = router;
