const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QuestionSchema = new Schema({
	question: {
		type: String,
		required: true,
		default: "Question"
	},
	choices: {
		type: Array,
		required: true,
		default: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
	},
	correctIndex: {
		type: Number,
		required: true,
		min: 0,
		max: 3,
		default: 0
	},
	points: {
		type: Number,
		default: 10
	}
});

module.exports = Question = mongoose.model("Question", QuestionSchema);
