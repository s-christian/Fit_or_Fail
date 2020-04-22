/* Resources:
 * https://docs.mongodb.com/manual/tutorial/aggregation-with-user-preference-data/
 * https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group
 * https://stackoverflow.com/questions/22873614/mongodb-aggregation-sum-values-of-a-key-in-a-collection
 * https://stackoverflow.com/questions/21803290/get-a-count-of-total-documents-with-mongodb-when-using-limit/21803405
 * https://docs.mongodb.com/manual/reference/operator/aggregation/facet/
 */

const express = require("express");
const router = express.Router();

const authRole = require("../../middleware/authRole");
const authGov = authRole("gov");

// Item model
const User = require("../../models/User");

router.get("/scores", authGov, (req, res) => {
	User.aggregate(
		[
			{
				$group: {
					_id: null, // group everything together
					pointTotal: { $sum: "$points" },
					answerTotal: { $sum: "$totalAnswers" },
					correctAnswerTotal: { $sum: "$correctAnswers" },
					winTotal: { $sum: "$wins" }
				}
			}
		],
		(err, results) => {
			if (err) return res.json({ err });
			delete results[0]._id;
			return res.send(results[0]);
		}
	);
});

router.get("/registrations", authGov, (req, res) => {
	// Return number of Users registered by year and month

	User.aggregate(
		[
			{
				// "Processes multiple aggregation pipelines within a single stage on the same set of input documents."
				$facet: {
					total_registrations: [{ $count: "total_registrations" }],
					registrations_by_date: [
						{
							$group: {
								// _id is the required first first used to group documents
								// _id: <expression>,
								_id: {
									month: { $month: "$register_date" },
									year: { $year: "$register_date" }
								},
								// <field1>: { <accumulator1> : <expression1> },
								// ...
								accounts_registered: { $sum: 1 } // increment by 1 (from 0) for every document that matches this group (based off of the User's register_date)
							}
						},
						{ $sort: { "_id.month": -1, "_id.year": -1 } }
					]
				}
			}
		],
		(err, results) => {
			if (err) return res.json({ err });
			// Maybe not the most elegant solution, but it allows me to get the total registration count and group the registrations within one aggregation
			new_results = {
				total_registrations: results[0].total_registrations[0].total_registrations,
				registrations_by_date: results[0].registrations_by_date
			};
			return res.json(new_results);
		}
	);
});

module.exports = router;
