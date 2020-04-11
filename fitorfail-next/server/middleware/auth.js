/* Middleware used to send user to the login page if no token or an invalid token is detected */

const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
		// Token could be expired or modified, or not even exist
		if (err) return res.redirect("/login");
		next();
	});
}

module.exports = auth;
