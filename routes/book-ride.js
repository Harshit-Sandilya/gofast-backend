const express = require("express");
const con = require("../connect");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.route("/").post(async (req, res) => {
	try {
		const { token, id } = req.body;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		con.query(
			`UPDATE ride SET status = 'accepted', driver_id = '${decoded.id}' WHERE id = '${id}'`,
			function (err, result) {
				if (err) throw err;
			}
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
