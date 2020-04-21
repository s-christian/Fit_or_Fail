const express = require("express");
const router = express.Router();

const authRole = require("../../middleware/authRole");
const authUser = authRole("user");

// Item model
const Question = require("../../models/Question");

// Retrieve a list of all Questions
router.get("/", authUser, (req, res) => {
	Question.find()
		// With how the Array.sort() function works, sort the array randomly and return the first four questions
		.then((questions) => res.json(questions.sort(() => 0.5 - Math.random()).slice(0, 5)))
		.catch((error) => res.json({ error }));
});

module.exports = router;
