require('dotenv').config({ path: '../../config/.env' });
const express = require('express');
const router = express.Router();
const Validator = require("validator");
const isEmpty = require("is-empty");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User model
const User = require('../../models/User');

// @route   POST api/register
// @desc    Register new User
// @access  Public
router.post('/', (req, res) => {
    let { username, email, password, confirm_password, account_type } = req.body;

    let valid_account_types = ['user', 'parent', 'gov', 'admin'];
    let errors = {};

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
        errors.username = "Username field is required";
    } else if (!Validator.isAlphanumeric(username, 'en-US')) {
        errors.username = "Username cannot contain symbols";
    }

    // Email checks
    if (Validator.isEmpty(email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (!Validator.isLength(password, { min: 6, max: 32 })) {
        errors.password = "Password must be 6-32 characters";
    }
    if (Validator.isEmpty(password)) {
        errors.password = "Password field is required";
    }
    if (!Validator.equals(password, confirm_password)) {
        errors.confirm_password = "Passwords do not match";
    }
    if (Validator.isEmpty(confirm_password)) {
        errors.confirm_password = "Confirm password field is required";
    }

    // Account Type checks
    if (account_type !== "" && !valid_account_types.includes(account_type)) {
        errors.account_type = "Invalid account type";
    }

    // If we have any errors, return
    if (!isEmpty(errors)) {
        return res.status(400).json({ msg: 'Provided fields are incorrect due to the following errors', errors });
    }

    // Check for existing user if register input is valid
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });
            
            let newUser;
            if (account_type == "") {
                newUser = new User({
                    username,
                    email,
                    password,
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
                    newUser.save()  // add new user to database
                        .then(user => {
                            // Issue token
                            jwt.sign(
                                { id: user.id },
                                process.env.JWT_SECRET,
                                { expiresIn: 3600 },  // token/session expires in one hour
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
        });
});

module.exports = router;
