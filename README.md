# XEGR Demo

## Introduction

XEGR is a premier web platform engineered to streamline the process of property transactions. Designed for individuals intent on renting, selling, or purchasing properties, XEGR delivers an unparalleled user experience, incorporating a simple yet powerful interface. Drawing inspiration from the esteemed Greek site xe.gr, our platform facilitates effortless navigation and advanced search capabilities for both residential and commercial properties. XEGR empowers users to manage property listings with ease and precision, providing a sophisticated toolset for the real estate market.

## Features

1. **User Accounts**: Facilitate property management with a dedicated account for listings and favorites.
2. **Advanced Search & Filters**: Deploy a sophisticated search functionality to locate the ideal property that meets specific criteria.
3. **Seamless Property Listings**: Offer a streamlined process for posting detailed property advertisements with high-quality imagery.
4. **Favorites System**: Allow users to curate and access favored listings with a single click.

## Technology Stack

This web application is constructed using **React** for the frontend with **TailwindCSS** for the utility styling framework of choice alongside **ShadUI** which is using **RadixUI** under the hood for accessibility, **Express** for the backend. For the database, **mysqlite** was chosen for easier installation with an the **sequelize ORM**.

---

## Configuration

After cloning the monorepo project, you will find 2 packages, one for the front and one for the back. After we run `npm install` in both directories we need to configure the `.env.example` files in each of these directories.

### React ENV (Vite)

The first .env consist of the server domain and port we are gonna use for the **express** server.

_Example:_

```
VITE_SERVER_DOMAIN=192.168.1.1
VITE_SERVER_PORT=4000
```

### Express ENV

The second .env consist of the following properties
_Example:_

```
CORS_ORIGIN=http://192.168.1.1:5173
PORT=4000
JWT_SECRET=<YOUR_SECRET>
XEGR_ENDPOINT=<XEGR_TEST_ENDPOINT>
PEXELS_API_KEY=<YOUR_API_KEY>
```

To create a secret for JWT an easy way is to run the following command on cmd and copy the value generated.
`node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`

Lastly we need to run the servers by running `npm run dev` on both `packages/express-server` and `packages/react-frontend`.

---

## Getting Started

Embark on the full-fledged XEGR journey by following these directives:

1. **Account Registration**: Establish a new user account or sign in to an existing one.
2. **Effortless Navigation**: Utilize the navigation bar to peruse sections such as 'Home', 'Ads', and 'About'.
3. **Property Listing Initiation**: Commence a property listing by clicking on the icon featuring a house augmented with a plus sign, or by selecting 'Create Listing' under the 'Ads' section.
4. **Form Submission**: Engage with the pop-up form to input comprehensive details about the property.
5. **Listing Management**: Post-submission, oversee the listing through the overview page, which offers options to edit or remove the property as needed.

---

**TODOs:**

- Remove pexels API and make uploading images/videos available to the user.
- Add the favorite functionality after the user clicks on the heart button.
- Make the page `Listings` and `Settings` of the user. Now pointing to null.
- Refactor some of the code which was made in a hacky way.
- Add caching to the API calls.
- Display the correct name of the place selected upon editing a form. Showing an ID as a temp fix.
- Add unit testings / e2e.
- Fix some issues with the width/height of uneven images.

For inquiries or input, please do not hesitate to contact Stathis Stathopoulos at stathopoulos.stathis98@gmail.com.

## Acknowledgements

Profound gratitude is extended to my partner for her unwavering assistance in composing this part of this README file and her meticulous assessment of the application. Her insights have been critical to the refinement of XEGR.
