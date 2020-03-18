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
        socket.join(room)
        var myRoom = io.sockets.adapter.rooms[room]
        socket.emit('joined', room, socket.id);
        so[name] = socket
    });
    socket.on('leave', (room) => {
        var myRoom = io.sockets.adapter.rooms[room]
        socket.leave(room)
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', (room, data,name)=>{
        console.log(data)
        so[name].emit('message', room, socket.id,data);
        //socket.to(room).emit('message', room, socket.id, data)//房间内所有人,除自己外
    });

});

server.listen(5000, () => {
    console.log('listening on *:5000'+io);
});



