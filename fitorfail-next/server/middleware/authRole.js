/* Middleware used to send user to the login page if no token or an invalid token is detected */

const jwt = require("jsonwebtoken");

// This is a trick used for passing extra parameters to middleware: return a function within an outer function!
function authRole(role, redirect = true) {
	return function(req, res, next) {
		jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
			// Token could be expired or modified, or not even exist
			if (err) {
				if (redirect) return res.redirect("/login");
				return res.status(401).json({ error: "No valid token detected. Please log in." });
			}

			// Since the User already has a token, we know that they are at least a "user" account_type.
			// We only need to validate "gov" and "admin" account_types.
			// user < gov < admin
			const govRoles = ["gov", "admin"];
			if (role === "gov" && !govRoles.includes(decoded.account_type)) {
				if (redirect) return res.redirect("/");
				return res.status(403).json({ error: "Insufficient privileges." });
			} else if (role === "admin" && decoded.account_type !== "admin") {
				if (redirect) return res.redirect("/");
				return res.status(403).json({ error: "Insufficient privileges." });
			} else next(); // If everything is validated properly (role permissions match up), continue on to the requested page.
		});
	};
}

module.exports = authRole;
