const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const issueToken = require("../../lib/issueToken");

// The intention is for this to be called in the future after a User updates their profile_picture_url, username, etc.
// We want the token to maintain up-to-date data.
router.get("/", (req, res) => {
	const token = req.cookies.token;
	// First make sure that the User has a pre-existing token
	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			if (token) res.clearCookie("token"); // remove expired token cookie
			return res.json({ error: "Invalid token", errorMessage: err });
		}
		// Get updated User information from the database
		const user = await axios.get(`${process.env.BASE_URL}/api/users/id/${decoded.id}`);
		issueToken(req, res, user);
	});
});

module.exports = router;
