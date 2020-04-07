const express = require("express");
const router = express.Router();
const Validator = require("validator");
const bcrypt = require("bcryptjs");
const issueToken = require("../lib/issueToken");

// Item model
const User = require("../models/User");

// @route   POST api/login
// @desc    Authenticate user (log in)
// @access  Public
router.post("/", (req, res) => {
	const { usernameOrEmail, password, redirect } = req.body;

	// Simple validation
	if (!usernameOrEmail || !password)
		return res.status(400).json({ error: "Please enter all fields" });

	// Check whether the user provided a username or an email and adjust out database call accordingly
	let queryInfo = { username_lower: usernameOrEmail.toLowerCase() };
	if (Validator.isEmail(usernameOrEmail)) queryInfo = { email: usernameOrEmail.toLowerCase() };

	// Check for existing user
	User.findOne(queryInfo).then((user) => {
		if (!user) return res.status(400).json({ error: "User does not exist" });

		// Validate password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
			issueToken(req, res, user);
			if (redirect) return res.redirect(redirect);
		});
	});
});

module.exports = router;
