const jwt = require("jsonwebtoken");

/**
 * Return true or false depending on whether or not the provided token is verified.
 * @param {Token} user
 */
function tokenIsVerified(token) {
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return false;
		}
		return true;
	});
}

module.exports = tokenIsVerified;
