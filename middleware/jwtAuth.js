const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
	try {
		const token = req.header("Authentication");
		const decoded = jwt.verify(token, "dummySecretCode");

		if (decoded) {
			req.body.userId = decoded.id;
			next();
		} else {
			res.status(400).send({ msg: "Please Login First" });
		}
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
};

module.exports = { verify };
