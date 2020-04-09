/* Used by pages to check for a token, then receive the corresponding user's information from their User _id.
 * Or, if no token cookie is detected, the user is redirected to the login page.
 */

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Item model
const User = require("../../models/User");

router.post("/", (req, res) => {
	const { token } = req.body;
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		// Token could be expired or modified, or not even exist
		if (err) return res.json({ error: "Invalid token" });

		// Return the User's information by the _id within the decoded JWT
		User.findById(decoded.id)
			.select("-password") // don't retrieve the hashed password
			.then((user) => {
				if (user) return res.json({ user });
				else
					return res.json({
						error:
							"Wait... how did you get here?! At this point we should be guaranteed to find the User!"
					});
			})
			.catch((err) => {
				return res.json({ err });
			});
	});
});

module.exports = router;
