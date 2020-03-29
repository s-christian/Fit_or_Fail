# Simple Back End Test
### *Front end should start in the `./client/` directory*
### `npx create-react-app ./client`

---

*The .env file - which contains the databse information - is not included in this repo for security reasons. This means you will not be able to connect to the dev database.*
*If I forget to give you the database information, just ask me for it.*

### How to test
- Install all the dependencies which can be found in the `package.json` file. You might even be able to run `npm i` and auto-install all the dependencies, but I haven't tested this myself
    - I did not put the dependencies in the repo because those files account for the vast majority of the total project size, and it'd be better to download them yourself to avoid errors and potentially flooding your terminal after running `git status`
- Start the development server with `npm run server`
- There should now be a server running on http://localhost:5000
- Review the code in `./routes/api/` and make requests using [Postman](https://www.postman.com/)

When writing the front end, look inside `./models/` and observe the document structures.
Feel free to suggest changes to their structure if it makes your life easier. They currently contain the barebones information I imagine we'll need to interact with.
I put the questions in the back end since we'll probably fetch them from our database instead of hard coding them into the front end.

---

### Current API functions
- GET login     - requires valid JWT, returns User information excluding the password
- POST login    - returns a JWT plus User information excluding the password if given valid login credentials
- POST register - returns a JWT plus User information after adding User to the database if given valid registration information

---

### Technologies

##### Node packages:
- express       - popular backend framework
- mongoose      - popular MongoDB library
- jsonwebtoken  - used for user authentication
- bcryptjs      - used to hash passwords before storing in database
- validator     - validating registration input
- dotenv        - controls configuration variables that need to be hidden to the end user
- nodemon       - dev dependency, keeps a live localhost connection that auto-refreshes upon save

##### External software
- [Postman](https://www.postman.com/)   - a client to make HTTP requests to the server, necessary for testing the back end API

*Just take a look at `package.json` for all the information.*