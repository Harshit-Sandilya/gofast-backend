const express = require("express");
const con = require("../connect");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.route("/").get(async (req, res) => {
	try {
		const { token } = req.body;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		con.query(`SELECT * FROM auth WHERE id = '${decoded.id}'`, function (err, result) {
			if (err) throw err;
			result = result[0];
			if (result) {
				con.query(
					`SELECT * FROM ${result.role} WHERE id = '${decoded.id}'`,
					function (err, resultOther) {
						if (err) throw err;
						resultOther = resultOther[0];
						let finalResult = {
							name: result.name,
							rides: resultOther.rides,
						};
						res.status(200).json({
							message: "User Details Fetched",
							data: finalResult,
						});
					}
				);
				return;
			} else {
				res.status(401).json({ message: "User Details Fetch Failed" });
				return;
			}
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
