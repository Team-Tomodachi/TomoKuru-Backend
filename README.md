# TomoKuru
<img width="170" alt="TomoKuru Logo" src="https://user-images.githubusercontent.com/101092043/192830457-430aa01b-51a5-4bdc-af73-3fa4668e2efe.svg">


Welcome to TomoKuru. TomoKuru is an online platform that integrates a user-oriented mobile app and a vendor-orientated web site. The purpose of TomoKuru is to give individual users a new way to meet people with similar hobbies and interests, browse events that are going on in the city, and search for different types of venues where they may host or attend social gatherings. Vendors also have a new way to manage multiple venues to offer various packages that appear on the users venue screen.

Inside the TomoKuru organization, you will find 3 main respositories. The TomoKuru-Mobile app was built with React native and deployed through Expo Go. The TomoKuru-Web app was built with React and deployed on Google cloud services. The TomoKuru-Backend was developed with PostgreSQL and we utiziled Firebase for authentication and image handling.

## Check out the respositories

[TomoKuru-Mobile](https://github.com/Team-Tomodachi/TomoKuru-Mobile)

[TomoKuru-Web](https://github.com/Team-Tomodachi/TomoKuru-Web)

[TomoKuru-Backend](https://github.com/Team-Tomodachi/TomoKuru-Backend)

# How to download / access application

iOS - exp://u.expo.dev/update/414cc358-383e-474d-9ea1-091431f49bf8

<img width="309" alt="Screen Shot 2022-09-28 at 19 33 47" src="https://user-images.githubusercontent.com/92012639/192757689-a8c4d8c9-9e13-4b23-83e3-5049d90608e0.png">

android - exp://u.expo.dev/update/f8bbc29b-53f8-41ee-a1bd-4913330886ce

<img width="307" alt="Screen Shot 2022-09-28 at 19 33 17" src="https://user-images.githubusercontent.com/92012639/192757590-107593fe-2189-4965-8c10-16b07a8fd46d.png">


WEB - http://tomokuru-web.i-re.io/


# Presentations / Media

DEMO Night YouTube clip: 

DEMO Night slideshow: https://docs.google.com/presentation/d/14v-ZRIrl7CELSBT5_0rsTLBkJyDfRjgtJF1G0KVi18w/edit#slide=id.g7860b7d359_0_47
    
    
# Have any feedback?
We'd love to hear your questions, comments, or concerns! 

please mail stevemckillop@gmail.com 


# Meet the Team / Roles (github / linkedIn / email) 

Tech Lead / Fullstack / Design - Adam 

Product Owner / Front-end - Steve

Frontend Lead (mobile) - Han

Fullstack (web app) - Ken 

Backend Lead / Frontend(web app) - Jason

# Full Features List - Web App

- Vendor can signup / login / logout.
- Vendor can enter and update profile information (name, title, city, prefecture).
- Vendor can upload / edit profile picture.
- In the "Venue" page, vendor can view owned venue list.
    - create a venue with photo.
    - update a selected venue.
    - detele a selected venue.
- In the "Package" page, vendor can view package list of venue.
    - create a package with photo.
    - update a selected package.
    - detele a selected package.
- In the "Event" page, vendor can view event list of venue.
    - create a event with photo.
    - update a selected event.
    - detele a selected event.
    - Vendor could communicate with group owner in the event by sending messages.
- In the "Events without venue" page, vendor can view event list lacking venue.
- In the "Upcoming Event" page,  vendor can view upcoming event due to the event start time.
- In the "Hosted Event" page,  vendor can view upcoming event due to the event start time.

# Full Features List - Mobile App 
   - User can login / logout.
   - User can enter and update profile information (name, city, prefecture, emergency contact).
   - User can upload / edit profile picture.
   
   - On the HOME screen, users can view MY GROUPS 
        - users can view the groups they have joined
        - users can view the groups they have joined as a LEADER. 
        - users can view the groups they have joined as a MEMBER. 
        
   - On the HOME screen, users can view MY EVENTS 
        - users can view the events they have joined
        - users can view the events they have joined as a LEADER. 
        - users can view the events they have joined as a MEMBER. 
   
   - On the HOME screen, users can CREATE a GROUP.
        - users can upload and set a group photo. 
        - users can enter and set a group name and group description. 
        - users can select a TAG for their group. 
        
   - On the HOME screen, users can CREATE an EVENT.
        - users can upload and set an event photo. 
        - users can enter and set a event name and event description. 
        - users can set an event DATE and TIME.
        - users can select a GROUP to assign to the EVENT if they are a group LEADER. 
        - users can select a VENUE to assign to the EVENT, including "Not Decided". 
        - if the user selects "Not Decided" the event will show up on the TomoKuru WEB app as an "Event without an Venue". 
   
   - From the EXPLORE screen, users can view a list of GROUPS.
        - Users can scroll to see all groups and basic content. 
        - Users can search for groups
        - Users can filter groups by TAGS. 
        - Users can view group details by pressing on the group 
        - Users can JOIN the group by pressing a button. 
        
   - From the EXPLORE screen, users can view a list of EVENTS. 
        - Users can scroll to see all events and basic content. 
        - Users can view EVENT details by pressing on the event. 
        - Users can JOIN the EVENT by pressing a button. 
        
   - From the EXPLORE screen, users can view a list of VENUES.
        - Users can scroll to see all venues and basic content. 
        - Users can search for venues by LOCATION (ward/city).
        - Users can filter venues by smoking/non-smoking, outdoor seating, venue capacity. 
        - Users can view group details by pressing on the group 
        - Users can JOIN the group by pressing a button. 
        - On the VENUE DETAILS page, users can: 
            - View the venue description, address, phone number, email, and other details. 
            - Users can press a button to open the venue location in google maps. 
            - Users can press a button to view EVENT PACKAGES offered by the venue. 
            
   - From the SAFETY screen, users have an option of safety features. 
        - Users can send a text to their emergency contact to let them know they arrived at the venue and everything is okay. 
        - Users can send a text to their emergency contact to let them know they feel uncomfortable and call them ASAP. 
        - Users can also press a button that will call the polic (119) if the user presses the call button. 
        
   
   
    

   


# Styling Page

**Figma**

[https://www.figma.com/file/SjL7CVRzYaueUC5BV76cxW/Untitled?node-id=0%3A1](https://www.figma.com/file/SjL7CVRzYaueUC5BV76cxW/Untitled?node-id=0%3A1)

**Fonts** 

[https://fonts.google.com/specimen/Kanit](https://fonts.google.com/specimen/Kanit)

[https://fonts.google.com/specimen/Open+Sans](https://fonts.google.com/specimen/Open+Sans)

Kanit Black 900 for “Tomo” Black 900 Italic for “Kuru” (use spans) **ONLY FOR LOGO**

Kanit ExtraBold 800 & Italic for **#h1**

Kanit Bold 700 & Italic for **#h2~h3**

Card Titles = Open Sans - Bold,(@20px)

Open Sans Regular 400 and Italic for **body**

Open Sans Light 300, Medium 500, SemiBold 600, and Bold 700 (also Italic variants) are also OK to differentiate **sections** where needed. Try not to go beyond that. The really bold and punchy page divisions should be in Kanit.

**Colors**

Accent orange-yellow (buttons mostly)

#FCB90F main accent color for buttons, etc.

#CC960C darker alternate, for clicked/touched buttons etc. as needed (pref over lighter)

#FFD15C lighter alternate, for clicked/touched buttons etc. as needed

Body Text

#000000 black

Background and section boxing

#FFFFFF white

#DFDFDF  off-white

#B5B5B5 light gray

**Notes**

Buttons should be large, more wide than tall, and have higher padding on left/right

5px (~0.25rem) rounding on boxes

black text

no drop shadows (a pain to work with and keep uniform)

no strokes or borders

try to use blocks of color, ~~rather than lines~~ to divide sections (lines are probably ok)

~as an exception I think the safety screen buttons should still be green, the two negative ones should be shades of red.

#1DAE23  Safe

#D92222 Not good

#7C0404 POLICE

 

# Libraries

Axios

- Handling network request

React Query

- Handling caching and updating for server data

React Navigation

- Handling screens navigation

****React Native Zephyr****

- Styling with Tailwind syntax

Expo Vector Icons

- Contains multiple icons set

Zustand

- Manage local state

Formik

- Handle form

React Native Paper

- Pre-built components with Material UI design

****FastImage****

- Caching and displaying Image



# ENDPOINTS

Please checkout our <img width="180" alt="Screen Shot 2022-09-28 at 23 49 19" src="https://user-images.githubusercontent.com/92012639/192811014-9edb8c8c-a44f-4b88-a1e5-a4c82bbecba4.png"> : 

http://tomokuru.i-re.io/api_dev_docs/#/Groups/patch_groups__group_id_


