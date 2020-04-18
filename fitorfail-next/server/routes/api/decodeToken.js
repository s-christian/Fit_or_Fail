const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// req.cookies.x only seems to work with client-side requests, as it doesn't work within getServerSideProps.

router.get("/", async (req, res) => {
	const token = req.cookies.token;
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			if (token) res.clearCookie("token"); // remove expired token cookie
			return res.json({ error: "Invalid token", errorMessage: err });
		}
		return res.json({ decoded });
	});
});

router.post("/", (req, res) => {
	const token = req.body.token;
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			if (token) res.clearCookie("token"); // remove expired token cookie
			return res.json({ error: "Invalid token", errorMessage: err });
		}
		return res.json({ decoded });
	});
});

module.exports = router;
