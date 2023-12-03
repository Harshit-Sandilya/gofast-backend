const express = require("express");
const con = require("../connect");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

function generateUuid() {
	return uuidv4().replace(/-/g, "");
}

router.route("/").get(async (req, res) => {
	try {
		const { token } = req.body;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const id = generateUuid();
		con.query(
			`INSERT INTO ride (id, user_id, status) VALUES ('${id}','${decoded.id}', 'requested')`,
			function (err, result) {
				if (err) throw err;
			}
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
