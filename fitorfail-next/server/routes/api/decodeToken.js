const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
	const { token } = req.body;
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) return res.json({ error: "Invalid token", errorMessage: err });
		return res.json({ decoded });
	});
});

module.exports = router;
