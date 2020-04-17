const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.clearCookie("token");
	return res.redirect("/");
});

module.exports = router;
