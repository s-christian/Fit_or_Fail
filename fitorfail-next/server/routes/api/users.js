const express = require("express");
const router = express.Router();

// Item model
const User = require("../../models/User");

// @route   GET api/users/:username
// @desc    Get user data
// @access  Public
router.post("/username/:username", (req, res) => {
	const { authenticated } = req.body;
	const selectOptions = authenticated ? "-password" : "-password -email"; // authenticated user should be able to see their own email address
	User.findOne({ username_lower: req.params.username.toLowerCase() })
		.select(selectOptions) // don't get the password or email (minus sign means exclude)
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

router.post("/id/:id", (req, res) => {
	const { authenticated } = req.body;
	const selectOptions = authenticated ? "-password" : "-password -email"; // authenticated user should be able to see their own email address
	User.findById(req.params.id)
		.select(selectOptions) // don't get the password or email (minus sign means exclude)
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
