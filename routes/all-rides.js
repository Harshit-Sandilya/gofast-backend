const express = require("express");
const con = require("../connect");
const router = express.Router();

router.route("/").get(async (req, res) => {
	try {
		con.query(
			`SELECT rid,status,time,source,destination FROM ride WHERE status='requested'`,
			function (err, result) {
				if (err) throw err;
				res.status(200).json({
					message: "All Rides Fetched",
					data: result,
				});
			}
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
