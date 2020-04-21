const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AdSchema = new Schema({
	title: {
		type: String,
		required: "Ad title required with a max of 32 characters",
		maxlength: 32,
		minlength: 1
	},
	sponsor_url: {
		type: String,
		required: "URL required for when the user clicks on the ad"
	},
	image_url: {
		type: String,
		default: "/assets/images/sponsors/default_ad.jpg"
	},
	message: {
		type: String,
		default: ""
	}
});

module.exports = Ad = mongoose.model("Ad", AdSchema);
