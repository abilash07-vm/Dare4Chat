
const { Server }= require('socket.io');
const io = new Server();

var Socket = {
    emit: function (event, data) {
        console.log(event, data);
        io.sockets.emit(event, data);
    }
};
var currentOnlineCount=0;

io.on("connection", function (socket) {
    currentOnlineCount+=1;
    console.log('current action count=',currentOnlineCount);
    socket.on('disconnect',(reason)=>{
        currentOnlineCount-=1;
        console.log('current action count=',currentOnlineCount);
    })
});

exports.Socket = Socket;
exports.io = io;