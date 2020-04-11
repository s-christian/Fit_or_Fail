/* Resources: https://mongoosejs.com/docs/api.html
 */

const express = require("express");
const router = express.Router();

const authRole = require("../../middleware/authRole");
const authGovNoRedirect = authRole("gov", false);

// Item model
const Question = require("../../models/Question");

// Retrieve a list of all Questions
router.get("/", authGovNoRedirect, (req, res) => {
	Question.find()
		.then((questions) => res.json(questions))
		.catch((err) => res.json({ err }));
});

// Add or Delete a Question
router.post("/", authGovNoRedirect, (req, res) => {
	const { question, choices, correctIndex, points } = req.body;
	// Set the points to the default value of 10 if no point value was provided
	if (points === undefined) points = 10;

	if (
		question === undefined ||
		choices === undefined ||
		choices.length !== 4 ||
		correctIndex === undefined ||
		correctIndex > 3 ||
		correctIndex < 0 ||
		points > 1000
	)
		return res.json({
			error:
				"Must provide the question, an array of four choices, the index of the correct choice in that array, and an optional point value no great than 1000 (defaults to 10). "
		});
	else {
		new Question({
			question,
			choices,
			correctIndex,
			points
		})
			.save()
			.then((question) => res.json({ question }))
			.catch((err) => res.json({ err }));
	}
});

router.delete("/", authGovNoRedirect, (req, res) => {
	const { id } = req.body;
	if (id === undefined) return res.json({ error: "Must provide the Question _id to delete" });
	else {
		Question.findByIdAndDelete(id)
			.then((deletedQuestion) => res.json({ deletedQuestion }))
			.catch((err) => res.json({ err }));
	}
});

module.exports = router;
