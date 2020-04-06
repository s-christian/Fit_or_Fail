const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
	res.clearCookie("token");
	res.json({ msg: "Logged out" });
});

module.exports = router;
