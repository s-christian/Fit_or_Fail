const express = require("express");
const router = express.Router();
const tokenIsVerified = require("../../lib/tokenIsVerified");

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

router.post("/username/:username", (req, res) => {
	const { token } = req.body;
	let authenticated = false;
	if (tokenIsVerified(token)) authenticated = true;
	const selectOptions = authenticated ? "-password" : "-password -email"; // authenticated user should be able to retrieve their own email address
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
	const { token } = req.body;
	let authenticated = false;
	if (tokenIsVerified(token)) authenticated = true;
	const selectOptions = authenticated ? "-password" : "-password -email"; // authenticated user should be able to retrieve their own email address
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
