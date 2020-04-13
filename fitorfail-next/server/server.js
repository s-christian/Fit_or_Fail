/* Resources:
 * https://www.youtube.com/watch?v=kmrJkrW-ha0
 * https://github.com/zeit/next.js/tree/master/examples/custom-server-express
 */

if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cookieParser = require("cookie-parser");

const next = require("next");
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const authRole = require("./middleware/authRole");

app.prepare().then(() => {
	const server = express();

	// --- Setup ---
	// Used to parse the body of requests
	server.use(express.json());
	// Used to access browser cookies
	server.use(cookieParser());

	// --- Connect to our MongoDB ---
	mongoose
		.connect(process.env.DB_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		}) // extra options used to eliminate deprecation warnings
		.then(() => console.log("MongoDB Connected...")) // .then and .catch exist because mongoose.connect() is "promise-based"
		.catch((err) => console.log(err));

	// --- Use API Routes ---
	server.use("/login", require("./routes/login"));
	server.use("/logout", require("./routes/logout"));
	server.use("/register", require("./routes/register"));
	server.use("/api/users", require("./routes/api/users"));
	//server.use("/api/auth", require("./routes/api/auth"));
	server.use("/api/decodeToken", require("./routes/api/decodeToken"));
	server.use("/api/questions", require("./routes/api/questions"));

	// --- Protected Routes ---
	// Set up predefined authentication mechanisms for all three of our possible User account_types
	const authUser = authRole("user");
	const authGov = authRole("gov");
	const authAdmin = authRole("admin");

	server.all(["/game", "/game/solo", "/game/online"], authUser, (req, res) => {
		return handle(req, res);
	});
	server.all(["/contribute", "/contribute/questions"], authGov, (req, res) => {
		return handle(req, res);
	});

	// --- Special ---
	// Special serving for user pages to account for case differences in the URL (ex: route to the correct user 'Christian' if somebody attempts to go to "CHRISTIAN")
	// Note: I can't believe this actually works. I'm dumbfounded at how long it took me to figure this out vs how relatively simple it ended up being.
	// It's been hours. I finally had the thought to try custom routing on the back end, and it worked. I'm very glad I don't have to think about this any more.
	// I tried every option under the sun for Next's Router (import "next/router"), and nothing worked.
	server.get("/users/:username", (req, res) => {
		const { username } = req.params;
		axios
			.post(`${process.env.BASE_URL}/api/users/username/${username}`)
			.then((apiRes) => {
				// If user is found but requested username does not match the case of the user's username, change the URL to the case-corrected username
				// URL redirect before page load
				if (apiRes.data.user && apiRes.data.user.username !== username) {
					// console.log("Serve it new!");
					return res.redirect(`${apiRes.data.user.username}`);
				}
			})
			.catch((err) => console.error({ error: "Cannot reach api endpoint", err }));
		// Else, render the default user page with the as-is URL
		// console.log("Serve it normal!");
		return handle(req, res);
	});

	// --- Final Config ---
	// Let Next.js handle serving pages like it usually does
	server.all("*", (req, res) => {
		return handle(req, res);
	});

	// Start the server, listening on our specified port
	server.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`Server started on port ${PORT}`);
	});
});
