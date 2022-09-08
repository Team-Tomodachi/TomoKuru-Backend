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
 *    venues:
 *      type: object
 *      required:
 *        - id
 *        - user_id
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the venues
 *        user_id:
 *          type: string
 *          description: ID of the user who created/owns the venue (foreign key)
 *        location_name:
 *          type: string
 *          description: Name of the venue
 *        city_ward:
 *          type: string
 *          description: Town of where the venue is located
 *        prefecture:
 *          type: string
 *          description: Prefecture of where the venue is located
 *        phone_num:
 *          type: string
 *          description: the phone number of the venue
 *        address:
 *          type: string
 *          description: Venue address
 *        description:
 *          type: string
 *          description: Brief description of the venue
 *        num_seats:
 *          type: integer
 *          description: Capacity of patron seats at a venue
 *        smoking:
 *          type: string
 *          description: Describes the smoking options available.
 *        outdoor_seating:
 *          type: boolean
 *          description: Identifies if the venue has outdoor seating.
 *        venue_url:
 *          type: string
 *          description: The URL of the venue
 *        photo_link:
 *          type: string
 *          description: the link to the venue photo in the database
 *
 */
