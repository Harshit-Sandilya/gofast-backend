const express = require("express");
const bcrypt = require("bcryptjs");
const con = require("../connect");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

function generateUuid() {
	return uuidv4().replace(/-/g, "");
}

router.route("/").post(async (req, res) => {
	try {
		const { name, password } = req.body;
		const id = generateUuid();
		const encryptedPassword = await bcrypt.hash(password, 10);
		con.query(
			`INSERT INTO auth (id, name, password, role) VALUES ('${id}','${name}', '${encryptedPassword}', 'user')`,
			function (err, result) {
				if (err) throw err;
			}
		);
		con.query(`INSERT INTO user (id, rides) VALUES ('${id}', 0)`, function (err, result) {
			if (err) throw err;
		});
		res.status(200).json({ message: "User created" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
