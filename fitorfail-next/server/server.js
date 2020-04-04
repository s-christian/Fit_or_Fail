/* Resources:
 * https://www.youtube.com/watch?v=kmrJkrW-ha0
 * https://github.com/zeit/next.js/tree/master/examples/custom-server-express
 */

require("dotenv").config();
const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const axios = require("axios");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const auth = require("./middleware/auth");

app.prepare().then(() => {
	const server = express();

	// Used to parse the body (replaces the body-parser package)
	server.use(express.json());

	// DB config
	const db = process.env.DB_URI;

	// Connect to Mongo
	mongoose
		.connect(db, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		}) // extra options used to eliminate deprecation warnings
		.then(() => console.log("MongoDB Connected...")) // .then and .catch exist because mongoose.connect() is "promise-based"
		.catch((err) => console.log(err));

	// Use API routes
	server.use("/api/login", require("./routes/api/login"));
	server.use("/api/register", require("./routes/api/register"));
	server.use("/api/users", require("./routes/api/users"));

	// Special serving for user pages to account for case differences in the URL (ex: route to the correct user 'Christian' if somebody attempts to go to "CHRISTIAN")
	// Note: I can't believe this actually works. I'm dumbfounded at how long it took me to figure this out vs how relatively simple it ended up being.
	// It's been hours. I finally had the thought to try custom routing on the back end, and it worked. I'm very glad I don't have to think about this any more.
	// I tried every option under the sun for Next's Router (import "next/router"), and nothing worked.
	server.get("/users/:username", (req, res) => {
		const username = req.params.username;
		axios
			.get(`${req.protocol}://${req.get("host")}/api/users/${username}`)
			.then((apiRes) => {
				// If user is found but requested username does not match the case of the user's username, change the URL to the case-corrected username
				// URL redirect before page load
				if (apiRes.data.user && apiRes.data.user.username !== username) {
					// console.log("Serve it new!");
					return res.redirect(`${apiRes.data.user.username}`);
				}
			})
			.catch((err) => console.error({ msg: "Cannot reach api endpoint", err }));
		// Else, render the default user page with the as-is URL
		// console.log("Serve it normal!");
		return handle(req, res);
	});

	// Routes that require authentication
	// TODO: FINISH THIS! User must be logged in to access the game page, otherwise they're redirected to the login page.
	server.get(["/game/solo", "/game/online"], auth, (req, res) => {
		console.log(req.user);
		// default
		return handle(req, res);
	});

	// Let Next.js handle serving pages like it usually does
	server.all("*", (req, res) => {
		return handle(req, res);
	});

	server.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`Server started on port ${PORT}`);
	});
});
