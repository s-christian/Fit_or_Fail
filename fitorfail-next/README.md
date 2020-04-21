# Installation Instructions

-   Navigate to the `fitorfail-next` folder within a command prompt
-   Run `npm i` to install all the dependencies
-   Create a `.env` file in the root directory of the `fitorfail-next` folder
-   Ask someone for the information that goes in the `.env` file which contains our database connection w/ password, and our password-hashing password
-   After all this, run the project with `npm run dev` from the root directory

---

# TODO

-   `/contribute` landing page
    -   `/contribute/questions` frontend needed. API already exists @ `/api/questions`.
    -   `/contribute/sponsors` frontend needed. API already exists @ `/api/ads`.
-   `/leaderboard` frontend. API already exists @ `/api/topUsers`.
-   `/statistics` frontend. API already exists @ `/api/userStatistics/[scores, registrations]`.
-   Email contact form
    -   Front end form that collects contact information, the actual email content, etc.
    -   Nodemailer back end
-   Online multiplayer kahoot-style game
    -   Teams
-   Mobile optimizations
    -   Game index page
    -   About page
    -   Anywhere else that you see might need it
        -   users should NEVER have to horizontally scroll for anything

## Future TODO

-   Make donations "proper" with donator names, custom donation amounts, etc.
    -   Made an official Stripe account with real keys instead of test keys; make it ready for production
-   Minor animations to make for a smoother experience
-   User profile dashboard that's editable
    -   User bio
-   Donating gives you a "donor" account_type which unlocks special features
    -   Change profile background color
-   "advertiser" account_type, manually given out to those allowed to post ads to the site
    -   Allow gov and admin users to review ads before they go live
    -   Allow advertiser users to preview how their ads will look before they submit them
-   Upload custom images
    -   User profile_pictures
    -   Ad image_urls
-   Improve API to add/delete multiple questions or ads at once
-   Improved site statistics
    -   points, totalAnswers, correctAnswers, and wins counts per month
        -   Statistics collection in MongoDB that holds totals for everything, and totals on a monthly basis
        -   Statistics updated automatically upon submission of user scores
-   Friends list
-   User refresh tokens to avoid the need to manually log in every two hours
    -   Way to blacklist or revoke certain tokens/refresh tokens in order to end the theft of a user's token
        -   Token expiration time is the minimum amount of time the thief will have with the stolen account

## Current Issues (to be fixed/optimized in the near future)

-   The Topbar has nested anchor tags which throws a lot of ugly errors, although they don't affect anything
-   Client-side user can view the correct answers to the quiz questions they were given
    -   This is not plainly visible; the user would have to look at the network request or similar, but this is still an issue
    -   Anybody with a valid JWT (of lowest account_type privilege "user") can make direct requests to the API endpoint to keep receiving information on a hard-coded number (currently 5) of randomly-selected questions from the database
-   Anybody with a valid JWT (of lowest account_type privilege "user") can make direct requests to the API endpoint for submitting scores
    -   This means that anybody can increase their correctAnswers and points by a max of 5 and 5000 respectively, at any time, and however often they want, as long as their token is valid

### Miscellaneous Notes

-   Cookies can only be set over HTTPS in production
    -   For some reason my phone connected over HTTP and I was wondering why the login wasn't working; I had to manually correct to HTTPS
-   Cookies should be set to expire in two hours, the same expiration time as the JWT

---

_Everything below this line is the default Next.js README_

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
