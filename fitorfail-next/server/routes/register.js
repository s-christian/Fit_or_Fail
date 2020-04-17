/* Resources:
 * https://youtube.com/watch?v=j4Tob0KDbuQ
 * https://jwt.io/introduction
 */

const express = require("express");
const router = express.Router();
const Validator = require("validator");
//const isEmpty = require("is-empty");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const issueToken = require("../lib/issueToken");

// User model
const User = require("../models/User");

// @route   POST api/register
// @desc    Register new User
// @access  Public
router.post("/", (req, res) => {
	let { username, email, password, confirmPassword } = req.body;
	const accountType = "user";

	// Only admins can create custom account types (anything other than "user": govs or admins)
	if (req.cookies.token) {
		async () => {
			const { data } = await axios.get(`${process.env.BASE_URL}/api/decodeToken`);
			// If the user initiating this request is an admin, accept their input for account_type
			if (data.decoded.account_type === "admin") accountType = req.body.account_type;
		};
	}

	let valid_account_types = ["user", "gov", "admin"];
	let validation_errors = [];
	let account_errors = [];

	/* --- Validation --- */
	// Username checks
	if (Validator.isEmpty(username)) {
		validation_errors.push("Username field is required");
	} else if (!Validator.isAlphanumeric(username, "en-US")) {
		validation_errors.push("Username cannot contain symbols");
	} else if (!Validator.isLength(username, { max: 16 })) {
		validation_errors.push("Username can be a max of 16 characters");
	}

	// Email checks
	if (Validator.isEmpty(email)) {
		validation_errors.push("Email field is required");
	} else if (!Validator.isEmail(email)) {
		validation_errors.push("Email is invalid");
	}

	// Password checks
	if (!Validator.isLength(password, { min: 6, max: 32 })) {
		validation_errors.push("Password must be 6-32 characters");
	} else if (!Validator.equals(password, confirmPassword)) {
		validation_errors.push("Passwords do not match");
	} else if (Validator.isEmpty(confirmPassword)) {
		validation_errors.push("Confirm Password field is required");
	}

	// Account Type checks (default is "user" as per the register page)
	if (!valid_account_types.includes(accountType)) {
		validation_errors.push("Invalid account type");
	}

	// If we have any validation_errors, return
	if (validation_errors.length !== 0) {
		return res.status(400).json({
			error: validation_errors
		});
	}

	// Check for existing user if after register input validation
	User.findOne({ username_lower: username.toLowerCase() }).then((user) => {
		if (user) account_errors.push("Username already taken");
		User.findOne({ email: email.toLowerCase() }).then((user) => {
			if (user) account_errors.push("Email already registered");

			// If we have any account_errors, return
			if (account_errors.length !== 0) {
				return res.status(400).json({
					error: account_errors
				});
			}

			// Go on to create new user and register in database
			const newUser = new User({
				username,
				email,
				password,
				account_type: accountType
			});

			// Create salt and hash
			// 10 rounds of encryption has a max rate of ~10 hashes per second. More rounds increase time exponentially (ex: 15 rounds = ~3 seconds per hash).
			bcrypt.genSalt(10, (err, salt) => {
				if (err) throw err;
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save() // add new user to database
						.then((user) => {
							issueToken(req, res, user);
						});
				});
			});
		});
	});
});

module.exports = router;
