const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	username: {
		type: String,
		required: "username required", // error message to display if not provided
		unique: true,
		maxlength: 16
	},
	username_lower: {
		type: String,
		unique: true,
		default: function() {
			return this.username.toLowerCase();
		}
	},
	email: {
		type: String,
		lowercase: true,
		required: "email required",
		unique: true
	},
	password: {
		type: String,
		required: "password required"
	},
	register_date: {
		type: Date,
		default: Date.now
	},
	account_type: {
		// three possible types: user < gov < admin
		type: String,
		default: "user"
	},
	profile_picture_url: {
		type: String,
		default: "/assets/images/default_profile.jpg" // could also be an external link
	},
	profile_bio: {
		type: String,
		default: ""
	},
	points: {
		type: Number,
		default: 0
	},
	correctAnswers: {
		type: Number,
		default: 0
	},
	totalAnswers: {
		type: Number,
		default: 0
	},
	wins: {
		// for online mode
		type: Number,
		default: 0
	},
	team: {
		type: String,
		default: "None"
	}
});

// Creates the new "User" collection in the database and exports that model
module.exports = User = mongoose.model("User", UserSchema);
