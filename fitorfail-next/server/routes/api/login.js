const express = require("express");
const router = express.Router();
const Validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Item model
const User = require("../../models/User");

// @route   POST api/login
// @desc    Authenticate user (log in)
// @access  Public
router.post("/", (req, res) => {
	const { usernameOrEmail, password } = req.body;

	// Simple validation
	if (!usernameOrEmail || !password)
		return res.status(400).json({ msg: "Please enter all fields" });

	// Check whether the user provided a username or an email
	let email = false;
	if (Validator.isEmail(usernameOrEmail)) email = true;

	// Check for existing User via username
	if (!email) {
		User.findOne({ username_lower: usernameOrEmail.toLowerCase() }).then((user) => {
			if (!user) return res.status(400).json({ msg: "User does not exist" });

			// Validate password
			bcrypt.compare(password, user.password).then((isMatch) => {
				if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
				// Issue token if credentials are valid
				jwt.sign(
					{ id: user.id },
					process.env.JWT_SECRET,
					{ expiresIn: 7200 }, // expires in two hours
					(err, token) => {
						if (err) throw err;
						res.json({
							token,
							user: {
								_id: user.id,
								username: user.username,
								username_lower: user.username_lower,
								email: user.email,
								profile_picture_url: user.profile_picture_url,
								points: user.points,
								wins: user.wins,
								team: user.team,
								account_type: user.account_type,
								register_date: user.register_date
							}
						});
					}
				);
			});
		});
	} else {
		// Check for existing User via email
		User.findOne({ email: usernameOrEmail.toLowerCase() }).then((user) => {
			if (!user) return res.status(400).json({ msg: "User does not exist" });

			// Validate password
			bcrypt.compare(password, user.password).then((isMatch) => {
				if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
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
								_id: user.id,
								username: user.username,
								username_lower: user.username_lower,
								email: user.email,
								profile_picture_url: user.profile_picture_url,
								points: user.points,
								wins: user.wins,
								team: user.team,
								account_type: user.account_type,
								register_date: user.register_date
							}
						});
					}
				);
			});
		});
	}
});

module.exports = router;
