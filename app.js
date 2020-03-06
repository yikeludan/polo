const Koa = require('koa')
const Koa1 = require("koa");
const redis = require("redis");
const WebSocket = require("koa-websocket");

const sub = redis.createClient(6379, '139.196.89.179');
const pub = redis.createClient(6379, '139.196.89.179');


const path = require('path')

const parse = require('koa-bodyparser')
const {catchError,globalUser} = require('./mid/exception')
const InitManager = require('./untl/init')
const dbInit = require('./untl/dbInit')

const static =  require('koa-static')
const koaBody = require('koa-body');

const app = new Koa();
app.use(catchError)
app.use(parse())



app.use(static(path.join(__dirname, './static')))
InitManager.initCore(app)
dbInit.initCore();


require('./model/user')
const app1 = WebSocket(new Koa1());

sub.on("subscribe", function (channel, count) {
    console.log('监听到订阅事件',channel, count)
});
//在pub的时候会触发 message事件，我们的所有业务处理基本就是靠监听它了
sub.on("message", function (channel, message) {
    console.log('监听到发布事件')
    const array = message.split(",")
    const id = array[1];
    global.user[id].websocket.send(array[0]);
    console.log("sub channel " + channel + ": " + array[0]+"--"+array[1]);
});

let ctxs = [];
let ctxs1 = {};
global.user = ctxs1

app1.listen(3030);
/* 实现简单的接发消息 */
app1.ws.use((ctx, next) => {
    /* 每打开一个连接就往 上线文数组中 添加一个上下文 */
    const query = ctx.request.query
    ctxs.push(ctx);

    global.user[query.id] =ctx
    //22 通道 2-1 23 通道1-2
    sub.subscribe("channel"+query.toid+","+query.id);

    ctx.websocket.on("message", (message) => {

        pub.publish("channel"+query.id+","+query.toid, message+","+query.toid)

        //  const aa = ctx.request.query
        //  global.user[aa.toid].websocket.send(message);
    });
    ctx.websocket.on("close", (message) => {
        /* 连接关闭时, 清理 上下文数组, 防止报错 */
        let index = ctxs.indexOf(ctx);
        const aa1 = ctx.request.query
        if(message ===1001){
            //  global.user[aa1.toid].websocket.send("关闭连接");

        }


        ctxs.splice(index, 1);
    });
});

app.listen(5000)