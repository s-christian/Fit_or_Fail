const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	// Can only receive req.cookies thanks to cookie-parser
	const token = req.cookies.token;

	// Check for token
	if (!token) return res.redirect("/login");

	// Verify token
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			// Needs to be able to provide login.js a way to navigate back to the page that requested the login
			res.status(401).json({ error: "Invalid token. Please log in." });
			res.redirect("/login");
		}
		req.user = decoded; // decoded payload should only include a single User id, such that req.user.id is the only prop
		console.log("req.user:");
		console.log(req.user);
		next();
	});
}

module.exports = auth;
