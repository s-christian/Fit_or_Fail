const express = require("express");
const router = express.Router();
const axios = require("axios");

// Auth middleware
const authRole = require("../../middleware/authRole");
const authUser = authRole("user");

// User model
const User = require("../../models/User");

router.post("/", authUser, (req, res) => {
	const { numOfQuestions, correctCount, pointSum } = req.body;
	if (numOfQuestions > 5 || correctCount > 5 || pointSum > 5000) {
		console.error("Cheater detected");
		return res.json({ error: "Nice try..." });
	}

	// We cannot trust anyone to send the API just any userId. We must ensure that the userId provided comes directly from the logged-in User
	const token = req.cookies.token;
	axios
		.post(`${process.env.BASE_URL}/api/decodeToken`, { token })
		.then(({ data }) => {
			const userId = data.decoded.id;
			User.findById(userId)
				.select("-password -email")
				.then((user) => {
					user.totalAnswers = user.totalAnswers + numOfQuestions;
					user.correctAnswers = user.correctAnswers + correctCount;
					user.points = user.points + pointSum;
					user.save()
						.then((savedUser) => res.json({ savedUser }))
						.catch((error) => res.json({ error }));
				})
				.catch((error) => res.json({ error }));
		})
		.catch((error) => res.json({ error }));
});

module.exports = router;
