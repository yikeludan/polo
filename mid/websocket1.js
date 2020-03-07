const WebSocket = require("koa-websocket");
const Koa1 = require("koa");
const {sub,pub} = require('./redis')
const app1 = WebSocket(new Koa1());
const ctxs1 = {};


global.user = ctxs1
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

sub.on("error", function (err) {
    console.log("Error1 " + err);
   /* const {sub,pub} = require('./redis')
     this.subPro = sub
     this.pubPro = pub*/
});

pub.on("error", function (err) {
    console.log("Error2 " + err);
});

/* 实现简单的接发消息 */
app1.ws.use((ctx, next) => {
    /* 每打开一个连接就往 上线文数组中 添加一个上下文 */
    const query = ctx.request.query

    global.user[query.id] =ctx
    //22 通道 2-1 23 通道1-2
    console.log("进入")
    sub.subscribe("channel"+query.toid+","+query.id);
    ctx.websocket.on("message", (message) => {
        console.log(message)
        pub.publish("channel"+query.id+","+query.toid, message+","+query.toid)
    });
    ctx.websocket.on("close", (message) => {
        /* 连接关闭时, 清理 上下文数组, 防止报错 */
        const aa1 = ctx.request.query
        console.log("re = "+ global.user[aa1.id].websocket.readyState)

        console.log("close"+message)
        if(message ===1001){

                //故意报错
          //  sub.unsubscribe()
            //subPro.quit()
           // pub.quit();
        }
    });
    ctx.websocket.on("error", (message) => {
         console.log("error = "+message)
    });
});

module.exports = app1