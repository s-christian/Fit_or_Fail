const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	// Can only receive req.cookies thanks to cookie-parser
	const token = req.cookies.token;

	// Check for token
	if (!token) return res.redirect("/login");

	// Verify token
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			// Token could be expired or modified
			res.status(401).json({ error: "Invalid token. Please log in." });
			res.redirect("/login");
		}
		//return res.json({ userID: decoded })
		req.user = decoded; // decoded payload should only include a single User id, such that req.user.id is the only prop
		// not even sure if setting that was necessary since I don't think I'm using that information within the backend
		next();
	});
}

module.exports = auth;
