const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	// authorization: Bearer <token>
	const token = req.cookies.token;
	//const token = authHeader ? authHeader.split(" ")[1] : false;

	// Check for token
	if (!token) return res.status(401).json({ error: "No token, authorization denied" });
	// Verify token
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) return res.status(401).json({ error: "Invalid token" });
		req.user = decoded; // decoded payload should only include a single User id, such that req.user.id is the only prop
		console.log("req.user = ");
		console.log(req.user);
		next();
	});
}

module.exports = auth;
