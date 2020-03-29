/* Resources:
 * https://www.youtube.com/watch?v=kmrJkrW-ha0
 * https://github.com/zeit/next.js/tree/master/examples/custom-server-express
 */

require("dotenv").config();
const express = require("express");
const next = require("next");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	// Used to parse the body (replaces the body-parser package)
	server.use(express.json());

	// DB config
	const db = process.env.DB_URI;
	console.log("db: " + db);

	// Connect to Mongo
	mongoose
		.connect(db, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		}) // extra options used to eliminate deprecation warnings
		.then(() => console.log("MongoDB Connected...")) // .then and .catch exist because mongoose.connect() is "promise-based"
		.catch(err => console.log(err));

	// Use API routes
	server.use("/api/login", require("./routes/api/login"));
	server.use("/api/register", require("./routes/api/register"));
	server.use("/api/users", require("./routes/api/users"));

	// Let Next.js handle serving pages like it usually does
	server.all("*", (req, res) => {
		return handle(req, res);
	});

	server.listen(PORT, err => {
		if (err) throw err;
		console.log(`Server started on port ${PORT}`);
	});
});
