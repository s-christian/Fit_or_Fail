const express = require("express");
const router = express.Router();

// Item model
const User = require("../../models/User");

router.get("/", (req, res) => {
	// Get the top 10 players, sorted by points value
	User.aggregate(
		[
			{
				$project: {
					username: 1,
					team: 1,
					register_date: 1,
					profile_picture_url: 1,
					points: 1,
					totalAnswers: 1,
					correctAnswers: 1,
					percentageCorrect: {
						$cond: {
							if: { $eq: ["$totalAnswers", 0] },
							then: 0,
							else: { $divide: ["$correctAnswers", "$totalAnswers"] }
						}
					},
					wins: 1
				}
			},
			{ $sort: { points: -1 } },
			{ $limit: 10 } // send the top 10 Users, sorted in descending order by their points value
		],
		(err, results) => {
			if (err) return res.json({ err });
			return res.send(results);
		}
	);
});

module.exports = router;
