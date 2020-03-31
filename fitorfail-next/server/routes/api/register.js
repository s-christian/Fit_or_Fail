const express = require("express");
const router = express.Router();
const Validator = require("validator");
const isEmpty = require("is-empty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User model
const User = require("../../models/User");

// @route   POST api/register
// @desc    Register new User
// @access  Public
router.post("/", (req, res) => {
	let { username, email, password, confirm_password, account_type } = req.body;

	let valid_account_types = ["user", "gov", "admin"];
	let validation_errors = {};
	let account_errors = {};

	// Convert empty fields to an empty string so we can use validator functions
	// Essentially, if the field doesn't exist, we just create it as an empty string
	username = !isEmpty(username) ? username : "";
	email = !isEmpty(email) ? email : "";
	password = !isEmpty(password) ? password : "";
	confirm_password = !isEmpty(confirm_password) ? confirm_password : "";
	account_type = !isEmpty(account_type) ? account_type : "";

	// Validation
	// Username checks
	if (Validator.isEmpty(username)) {
		validation_errors.username = "Username field is required";
	} else if (!Validator.isAlphanumeric(username, "en-US")) {
		validation_errors.username = "Username cannot contain symbols";
	} else if (!Validator.isLength(username, { max: 16 })) {
		validation_errors.username = "Username must be a max of 16 characters";
	}

	// Email checks
	if (Validator.isEmpty(email)) {
		validation_errors.email = "Email field is required";
	} else if (!Validator.isEmail(email)) {
		validation_errors.email = "Email is invalid";
	}

	// Password checks
	if (!Validator.isLength(password, { min: 6, max: 32 })) {
		validation_errors.password = "Password must be 6-32 characters";
	}
	if (Validator.isEmpty(password)) {
		validation_errors.password = "Password field is required";
	}
	if (!Validator.equals(password, confirm_password)) {
		validation_errors.confirm_password = "Passwords do not match";
	}
	if (Validator.isEmpty(confirm_password)) {
		validation_errors.confirm_password = "Confirm password field is required";
	}

	// Account Type checks
	if (account_type !== "" && !valid_account_types.includes(account_type)) {
		validation_errors.account_type = "Invalid account type";
	}

	// If we have any validation_errors, return
	if (!isEmpty(validation_errors)) {
		return res.status(400).json({
			msg: "Provided fields are incorrect due to the following errors",
			validation_errors
		});
	}

	// Check for existing user if register input is valid
	User.findOne({ username_lower: username.toLowerCase() }).then((user) => {
		if (user) account_errors.username = "Username already taken";
		User.findOne({ email: email }).then((user) => {
			if (user) account_errors.email = "Email already registered";

			// If we have any account_errors, return
			if (!isEmpty(account_errors)) {
				return res.status(400).json({
					msg: "Cannot register this username or email",
					account_errors
				});
			}

			// Go on to create new user and register in database
			let newUser;
			if (account_type == "") {
				newUser = new User({
					username,
					email,
					password
				});
			} else {
				newUser = new User({
					username,
					email,
					password,
					account_type
				});
			}

			// Create salt and hash
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save() // add new user to database
						.then((user) => {
							// Issue token
							jwt.sign(
								{ id: user.id },
								process.env.JWT_SECRET,
								{ expiresIn: 3600 }, // token/session expires in one hour
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
			});
		});
	});
});

module.exports = router;
