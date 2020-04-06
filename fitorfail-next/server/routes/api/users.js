const express = require("express");
const router = express.Router();

// Item model
const User = require("../../models/User");

// @route   GET api/users
// @desc    Get user data
// @access  Public
router.get("/", (req, res) => {
	res.status(400).json({
		msg: "Provide user data to search for",
		options: {
			username: "/api/users/[username]"
		}
	});
});

// @route   GET api/users/:username
// @desc    Get user data
// @access  Public
router.get("/:username", (req, res) => {
	User.findOne({ username_lower: req.params.username.toLowerCase() })
		.select("-password -email") // don't get the password or email (minus sign means exclude)
		.then((user) => {
			if (user) return res.json({ user: user });
			return res.json({ error: `User ${req.params.username} does not exist` });
		})
		.catch((err) => res.json(err));
});

module.exports = router;
