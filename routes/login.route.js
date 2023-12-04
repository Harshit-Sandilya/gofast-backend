const express = require("express");
const bcrypt = require("bcryptjs");
const con = require("../connect");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.route("/").get(async (req, res) => {
	try {
		const { name, password } = req.body;
		con.query(`SELECT * FROM auth WHERE name = '${name}'`, function (err, result) {
			if (err) throw err;
			result = result[0];
			if (result && bcrypt.compareSync(password, result.password)) {
				const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET);
				res.status(200).json({ message: "User Login Accepted", data: token });
				return;
			} else {
				res.status(401).json({ message: "User Login Failed" });
				return;
			}
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
