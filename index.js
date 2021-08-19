const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors({origin: '*'}));  
const http=require('http').Server(app)
const io=require('socket.io')(http,{
	cors: {
	  origin: "http://localhost:3000",
	  methods: ["GET", "POST"],
	  allowedHeaders: ["Access-Control-Allow-Origin"],
	}
  })

const mainRoute = require("./router/mainRoute");
const { sendSocket } =require('./controller/methods')

require("dotenv").config();
	
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongo_url = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 3000;

mongoose
	.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		
		http.listen(PORT, () => {
			console.log(`connect to port  ${PORT}`);
			// io=socketIo(http.Server(app))
			io.on('connection',(socket)=>{
				sendSocket(app,'message',{"message":"hi i am abilash"})
			})
			app.use("", mainRoute(io));

		});
		
	})
	.catch((err) => {
		
	});

