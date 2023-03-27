const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
	try {
		const { name, email, password, gender, age, city, is_married } = req.body;
		const user = await UserModel.findOne({ email });

		if (user) {
			res.status(400).send({ msg: "User Already Exists" });
		} else {
			bcrypt.hash(password, 5, async (err, hash) => {
				const newUser = new UserModel({
					name,
					email,
					password: hash,
					gender,
					age,
					city,
					is_married,
				});
				await newUser.save();
				res.status(200).json({ msg: "User is successfully registered" });
			});
		}
	} catch (error) {
		// console.log(error.message);
		res.status(400).json({ msg: error.message });
	}
});

userRoutes.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email });

		if (user) {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					res.status(200).send({
						msg: "Logged In Successfully",
						token: jwt.sign({ id: user._id }, "dummySecretCode"),
					});
				} else {
					res.status(400).send({ msg: "Wrong Credentials" });
				}
			});
		} else {
			res.status(404).json({ msg: "User not found" });
		}
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

module.exports = { userRoutes };
