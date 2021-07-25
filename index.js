const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mainRoute = require("./router/mainRoute");
require("dotenv").config();

const mongo_url = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 3000;

mongoose
	.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("connected to mongodb!!!");

		app.listen(PORT, () => {
			console.log(`server running at ${PORT}`);

			app.use("", mainRoute());
		});
	})
	.catch((err) => {
		console.log(`mongo err: ${err}`);
	});
