/* Middleware used to send user to the login page if no token or an invalid token is detected */

const jwt = require("jsonwebtoken");

function authRole(role) {
	return function(req, res, next) {
		jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
			// Token could be expired or modified, or not even exist
			if (err) return res.redirect("/login");

			// Since the User already has a token, we know that they are at least a "user" account_type.
			// We only need to validate "gov" and "admin" account_types.
			// user < gov < admin
			const govRoles = ["gov", "admin"];
			if (role === "gov" && !govRoles.includes(decoded.account_type))
				return res.redirect("/login");
			else if (role === "admin" && decoded.account_type !== "admin")
				return res.redirect("/login");
			else next(); // If everything is validated properly (role permissions match up), continue on to the requested page.
		});
	};
}

module.exports = authRole;
