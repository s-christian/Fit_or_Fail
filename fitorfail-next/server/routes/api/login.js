require("dotenv").config({ path: "../../config/.env" });
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Item model
const User = require("../../models/User");

// @route   POST api/login
// @desc    Authenticate user (log in)
// @access  Public
router.post("/", (req, res) => {
	const { username, password } = req.body;

	// Simple validation
	if (!username || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	// Check for existing User
	User.findOne({ username }).then(user => {
		if (!user) return res.status(400).json({ msg: "User does not exist" });

		// Validate password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (!isMatch)
				return res.status(400).json({ msg: "Invalid credentials" });
			// Issue token if credentials are valid
			jwt.sign(
				{ id: user.id },
				process.env.JWT_SECRET,
				{ expiresIn: 3600 }, // expires in one hour
				(err, token) => {
					if (err) throw err;
					res.json({
						token,
						user: {
							id: user.id,
							username: user.username,
							email: user.email,
							profile_picture_url: user.profile_picture_url,
							points: user.points,
							team: user.team,
							account_type: user.account_type
						}
					});
				}
			);
		});
	});
});

module.exports = router;
