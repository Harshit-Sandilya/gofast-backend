const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const con = require("./connect");
const create = require("./schema.js");

const signupDriver = require("./routes/signupDriver.route");
const login = require("./routes/login.route");
const signupUser = require("./routes/signupUser.route");
const details = require("./routes/get-details");
const bookRide = require("./routes/book-ride");
const requestRide = require("./routes/request-ride");
const allRides = require("./routes/all-rides");
const completeRide = require("./routes/complete-ride");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/signup-driver", signupDriver);
app.use("/signup-user", signupUser);
app.use("/login", login);
app.use("/get-details", details);
app.use("/request-ride", requestRide);
app.use("/all-rides", allRides);
app.use("/book-ride", bookRide);
app.use("/complete-ride", completeRide);

app.use("/init", (req, res) => {
	for (let i in create) {
		con.query(create[i], function (err, result) {
			if (err) throw err;
		});
	}
	res.status(200).json({ message: "Database initialized" });
});
app.use("/clear", (req, res) => {
	con.query(`DROP TABLE auth, user, driver, car, ride`, function (err, result) {
		if (err) throw err;
	});
	res.status(200).json({ message: "Database cleared" });
});

app.use("/test", (req, res) => {
	res.status(200).json({ message: "Backend is running" });
});
app.use("*", (req, res) => {
	res.status(404).json({ message: "Wrong URL" });
});

module.exports = app;
