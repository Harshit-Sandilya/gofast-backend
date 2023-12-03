const express = require("express");
const con = require("../connect");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.route("/").post(async (req, res) => {
	try {
		const { id } = req.body;
		con.query(
			`UPDATE ride SET status = 'completed' ' WHERE id = '${id}'`,
			function (err, result) {
				if (err) throw err;
			}
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
