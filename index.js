const mongoose = require("mongoose");
const cors = require("cors");
const express=require("express")

const app = express();
app.use(cors({origin: '*'}));
const server=require('http').createServer(app)
const { io }=require('./controller/socket')
io.attach(server)
// const io=require('socket.io')(http)

const mainRoute = require("./router/mainRoute");
const messageContoller=require("./controller/messageController")

require("dotenv").config();
	
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongo_url = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 3000;

mongoose
	.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		
		server.listen(PORT, () => {
			console.log(`connect to port  ${PORT}`);
			// io=socketIo(http.Server(app))
			// io.on('connection',(socket)=>{
			// 	messageContoller.respond(socket);
			// });
			app.use("", mainRoute());

		});
		
	})
	.catch((err) => {
		
	});

