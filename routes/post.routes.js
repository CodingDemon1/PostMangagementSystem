const express = require("express");
const os = require("node:os");
const { PostModel } = require("../models/post.model");
const postRoute = express.Router();

postRoute.get("/", async (req, res) => {
	try {
		let userId = req.body.userId;
		const data = await PostModel.find({ userId });
		res.status(200).send(data);
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
});

postRoute.post("/add", async (req, res) => {
	try {
		const { title, body, userId } = req.body;
		console.log({ title, body, device: os.type(), no_of_comments: 0, userId });
		let newPost = new PostModel({
			title,
			body,
			device: os.type(),
			no_of_comments: 0,
			userId,
		});
		await newPost.save();
		res.status(400).send({ msg: "Post has been Created Successfully" });
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
});

postRoute.patch("/update/:id", async (req, res) => {
	try {
		const body = req.body;
		const userId = req.body.userId;
		// console.log(userId);
		const id = req.params.id;

		const data = await PostModel.findOne({ _id: id });

		if (data.userId == userId) {
			await PostModel.findByIdAndUpdate(id, body);
			res.status(200).send({ msg: "Post has Updated Successfully" });
		} else {
			res.status(404).send({ msg: "Post Not Found" });
		}
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
});

postRoute.delete("/delete/:id", async (req, res) => {
	try {
		// const body = req.body;
		const userId = req.body.userId;
		// console.log(userId);
		const id = req.params.id;

		const data = await PostModel.findOne({ _id: id });

		if (data.userId == userId) {
			await PostModel.findByIdAndDelete(id);
			res.status(200).send({ msg: "Post has been Deleted Successfully" });
		} else {
			res.status(404).send({ msg: "Post Not Found" });
		}
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
});
module.exports = { postRoute };
