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
		con.query(`SELECT * FROM ride WHERE id = '${id}'`, (result, error) => {
			if (error) throw error;
			result = result[0];
			con.query(
				`UPDATE user SET rides = rides + 1 WHERE id = '${result.userId}'`,
				function (err, result) {
					if (err) throw err;
				}
			);
			con.query(
				`UPDATE driver SET rides = rides + 1 WHERE id = '${result.driverId}'`,
				function (err, result) {
					if (err) throw err;
				}
			);
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
