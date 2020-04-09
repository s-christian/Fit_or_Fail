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
// something in auth is messing this up
router.get("/username/:username", (req, res) => {
	// Below two lines currently unnecessary for our use cases.
	// const tokenData = verifyToken(req.cookies.token); // currently using this as a flag
	// const selectOptions = tokenData ? "-password" : "-password -email"; // authenticated user should be able to see their own email address
	User.findOne({ username_lower: req.params.username.toLowerCase() })
		.select("-password -email") // don't get the password or email (minus sign means exclude)
		.then((user) => {
			// Could return us a user, or nothing at all if the user does not exist
			if (user) return res.json({ user });
			else
				return res.json({
					error: `User with username ${req.params.username} does not exist`
				});
		})
		.catch((err) => res.json(err));
});

router.get("/id/:id", (req, res) => {
	// Below two lines currently unnecessary for our use cases.
	// const tokenData = verifyToken(req.cookies.token); // currently using this as a flag
	// const selectOptions = tokenData ? "-password" : "-password -email"; // authenticated user should be able to see their own email address
	User.findById(req.params.id)
		.select("-password -email") // don't get the password or email (minus sign means exclude)
		.then((user) => {
			if (user) return res.json({ user });
			else
				return res.json({
					error: `User with ID ${req.params.id} does not exist`
				});
		})
		.catch((err) => res.json(err));
});

module.exports = router;
