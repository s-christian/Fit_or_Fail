# Installation Instructions

-   Navigate to the `fitorfail-next` folder within a command prompt
-   Run `npm i` to install all the dependencies
-   Create a `.env` file in the root directory of the `fitorfail-next` folder
-   Ask someone for the information that goes in the `.env` file which contains our database connection w/ password, and our password-hashing password
-   After all this, run the project with `npm run dev` from the root directory

---

# TODO

-   Allow "appropriate government officials and designated personnel" ("admin" and "gov") to contribute input (add/remove questions)
    -   `/contribute` and `/contribute/questions` frontend needed. API already exists.
-   Faciliate advertising
    -   Similar to contribute
-   Facilitate donations
    -   Stripe or similar third party, figure out how to use it
-   Ability for govs/admins to get a summary of all User information
    -   Total Users
    -   Total questions answered
    -   Total correct question answers
    -   ...etc
-   Mobile optimizations
    -   Game index page
    -   About page
    -   Anywhere else that you see might need it
        -   users should NEVER have to horizontally scroll for anything
-   User profile dashboard that's editable
    -   User bio
    -   Userpage custom background color
-   Multiplayer game

# Current Issues (to be fixed/optimized in the near future)

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
