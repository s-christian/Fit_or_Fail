const express = require("express");
const router = express.Router();

const authRole = require("../../middleware/authRole");
const authGov = authRole("gov");

// Item model
const Ad = require("../../models/Ad");

// Get a single random ad
router.get("/", (req, res) => {
	// May contain duplicate results, but it doesn't matter since it only needs one document
	Ad.aggregate([{ $sample: { size: 1 } }], (err, results) => {
		// aggregate returns and array of object matches, so we need to specify index 0 (for our one result)
		if (err) return res.json({ err });
		const random_ad = results[0];
		return res.json({ random_ad });
	});
});

// Get all ads
router.get("/all", (req, res) => {
	Ad.find()
		.then((ads) => res.send(ads))
		.catch((err) => res.json({ err }));
});

// Add an ad to the database
router.post("/", authGov, (req, res) => {
	const { title, sponsor_url, image_url, message } = req.body;

	if (!title || !sponsor_url) return res.json({ error: "Ad title and sponsor URL required" });

	// Create the new ad's document, building it based off the data that was given for its creation.
	// Any fields that weren't explicitly provided have default values according to the Ad schema.
	let newAd = null;
	if (!image_url && !message)
		newAd = {
			title,
			sponsor_url
		};
	else if (!message)
		newAd = {
			title,
			sponsor_url,
			image_url
		};
	else if (!image_url)
		newAd = {
			title,
			sponsor_url,
			message
		};
	else
		newAd = {
			title,
			sponsor_url,
			image_url,
			message
		};

	new Ad(newAd)
		.save()
		.then((ad) => res.json({ msg: "Ad created", ad }))
		.catch((err) => res.json({ err }));
});

router.delete("/", authGov, (req, res) => {
	const { id } = req.body;
	if (id === undefined) return res.json({ error: "Must provide the Ad _id to delete" });
	else {
		Ad.findByIdAndDelete(id)
			.then((deletedAd) => {
				if (!deletedAd)
					return res.json({ error: `Ad with _id ${id} not found in database` });
				return res.json({ msg: "Ad deleted", deletedAd });
			})
			.catch((err) => res.json({ err }));
	}
});

module.exports = router;
