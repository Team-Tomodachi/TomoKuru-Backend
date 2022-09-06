/**
 * components:
 *  schemas:
 *    users:
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
 *        email: john@example.com
 *        account_type: user
 *        active_account: active
 *        first_name: John
 *        city_ward: Shinjuku
 *        prefecture: Tokyo
 *        title: FullStack Developer
 */
