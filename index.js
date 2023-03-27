const express = require("express");
const { verify } = require("./middleware/jwtAuth");
const { connection } = require("./configs/db");
const { postRoute } = require("./routes/post.routes");
const { userRoutes } = require("./routes/user.routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);
app.use("/posts", verify, postRoute);
app.listen(8000, async () => {
	try {
		await connection();
		console.log("Port is running");
	} catch (error) {
		console.log(error.message);
	}
});
