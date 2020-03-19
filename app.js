const Koa = require('koa')




const path = require('path')
var cors = require('koa2-cors');

const parse = require('koa-bodyparser')
const {catchError,globalUser} = require('./mid/exception')
const InitManager = require('./untl/init')
const dbInit = require('./untl/dbInit')

const static =  require('koa-static')
const koaBody = require('koa-body');
const appWs = require('./mid/websocket')
const app = new Koa();

//const sock = require('./untl/listenSer')
app.use(catchError)
app.use(parse())
app.use(cors());
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

var USERCOUNT = 3;


app.use(static(path.join(__dirname, './static')))
InitManager.initCore(app)
dbInit.initCore();


require('./model/user')



appWs.listen(3030);

//app.listen(5000)

// 监听端口

// socket连接
var so ={}
io.on('connection', (socket) => {
    console.log('connected');

    socket.on('join', (room,name) => {
      /*  socket.join(room)
        var myRoom = io.sockets.adapter.rooms[room]
        socket.emit('joined', room, socket.id);
        so[name] = socket*/

        socket.join(room);
        console.log(name)
        var myRoom = io.sockets.adapter.rooms[room];
        var users = (myRoom)? Object.keys(myRoom.sockets).length : 0;

        if(users < USERCOUNT){
            socket.broadcast.emit('joined', room, socket.id);
           // socket.emit('joined', room, socket.id); //发给除自己之外的房间内的所有人
            if(users > 1){
                socket.to(room).emit('otherjoin', room, socket.id);
            }

        }else{
            socket.leave(room);
            socket.emit('full', room, socket.id);
        }
    });
    socket.on('leave', (room) => {
       /* var myRoom = io.sockets.adapter.rooms[room]
        socket.leave(room)*/
        var myRoom = io.sockets.adapter.rooms[room];
        var users = (myRoom)? Object.keys(myRoom.sockets).length : 0;
        //socket.emit('leaved', room, socket.id);
        //socket.broadcast.emit('leaved', room, socket.id);
        socket.to(room).emit('bye', room, socket.id);
        socket.emit('leaved', room, socket.id);
    });

    socket.on('blob', (data) => {
        console.log('blob = '+data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', (room, data)=>{
      /*  console.log(data)
        so[name].emit('message', room, socket.id,data);*/
        socket.to(room).emit('message',room, data);

        //socket.to(room).emit('message', room, socket.id, data)//房间内所有人,除自己外
    });

});

server.listen(5000, () => {
    console.log('listening on *:5000'+io);
});



