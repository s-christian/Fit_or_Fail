const express = require("express");
const router = express.Router();

// Item model
const User = require("../../models/User");

/**
 * Query the database for a User's information given the following parameters.
 * @param {*} req
 * @param {*} res
 * @param {JSON} query
 * @param {JSON} selectOptions
 * @param {String} errorMessage
 */
function getUserInfo(req, res, query, selectOptions, errorMessage) {
	User.findOne(query)
		.select(selectOptions)
		.then((user) => {
			// Could return us a user, or nothing at all if the user does not exist
			if (user) return res.json({ user });
			else
				return res.json({
					error: errorMessage
				});
		})
		.catch((err) => res.json(err));
}

// router.post("/username/:username", (req, res) => {
// 	const { authenticated } = req.body;
// 	const selectOptions = authenticated ? "-password" : "-password -email"; // authenticated user should be able to see their own email address
// 	User.findOne({ username_lower: req.params.username.toLowerCase() })
// 		.select(selectOptions) // don't get the password or email (minus sign means exclude)
// 		.then((user) => {
// 			// Could return us a user, or nothing at all if the user does not exist
// 			if (user) return res.json({ user });
// 			else
// 				return res.json({
// 					error: `User with username ${req.params.username} does not exist`
// 				});
// 		})
// 		.catch((err) => res.json(err));
// });

// @route   GET api/users/:username
// @desc    Get user data
// @access  Public
router.post("/username/:username", (req, res) => {
	const { authenticated } = req.body;
	const selectOptions = authenticated ? "-password" : "-password -email"; // authenticated user should be able to see their own email address
	getUserInfo(
		req,
		res,
		{ username_lower: req.params.username.toLowerCase() },
		selectOptions,
		`User with userame ${req.params.username} does not exist`
	);
});

router.get("/username/:username", (req, res) => {
	getUserInfo(
		req,
		res,
		{ username_lower: req.params.username.toLowerCase() },
		"-password -email",
		`User with userame ${req.params.username} does not exist`
	);
});

router.post("/id/:id", (req, res) => {
	const { authenticated } = req.body;
	const selectOptions = authenticated ? "-password" : "-password -email"; // authenticated user should be able to see their own email address
	getUserInfo(
		req,
		res,
		{ _id: req.params.id },
		selectOptions,
		`User with ID ${req.params.id} does not exist`
	);
});

router.get("/id/:id", (req, res) => {
	getUserInfo(
		req,
		res,
		{ _id: req.params.id },
		"-password -email",
		`User with ID ${req.params.id} does not exist`
	);
});

module.exports = router;
