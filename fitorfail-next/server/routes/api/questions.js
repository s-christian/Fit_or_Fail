/* Resources: https://mongoosejs.com/docs/api.html
 */

const express = require("express");
const router = express.Router();

const authRole = require("../../middleware/authRole");
const authGov = authRole("gov");

// Item model
const Question = require("../../models/Question");

// Retrieve an array of all Questions
router.get("/", authGov, (req, res) => {
	Question.find()
		.then((questions) => res.send(questions)) // returns an array of objects by default, which is exactly what we want (no res.json() needed)
		.catch((err) => res.json({ err }));
});

// Add or Delete a Question
router.post("/", authGov, (req, res) => {
	let { question, choices, correctIndex, points } = req.body;
	// Set the points to the default value of 10 if no point value was provided
	if (points === undefined) points = 10;

	if (
		question === undefined ||
		choices === undefined ||
		choices.length !== 4 ||
		correctIndex === undefined ||
		correctIndex > 3 ||
		correctIndex < 0 ||
		points > 1000 ||
		points < 10
	)
		return res.json({
			error:
				"Must provide the question, an array of four choices, the correctIndex, and a points value between 10 and 1000."
		});
	else {
		new Question({
			question,
			choices,
			correctIndex,
			points
		})
			.save()
			.then((question) => res.json({ msg: "Question created", question }))
			.catch((err) => res.json({ err }));
	}
});

router.delete("/", authGov, (req, res) => {
	const { id } = req.body;
	if (id === undefined) return res.json({ error: "Must provide the Question _id to delete" });
	else {
		Question.findByIdAndDelete(id)
			.then((deletedQuestion) => {
				if (!deletedQuestion)
					return res.json({ error: `Question with _id ${id} not found in database` });
				return res.json({ msg: "Question deleted", deletedQuestion });
			})
			.catch((err) => res.json({ err }));
	}
});

module.exports = router;
