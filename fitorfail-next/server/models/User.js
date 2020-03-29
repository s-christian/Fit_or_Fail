const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	register_date: {
		type: Date,
		default: Date.now
	},
	account_type: {
		type: String,
		default: "user"
	},
	profile_picture_url: {
		type: String,
		default: "/assets/images/default_profile.jpg" // could also be an external link
	},
	points: {
		type: Number,
		default: 0
	},
	wins: {
		type: Number,
		default: 0
	},
	team: {
		type: String,
		default: "None"
	}
});

module.exports = User = mongoose.model("User", UserSchema);
