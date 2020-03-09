const WebSocket = require("koa-websocket");
const Koa1 = require("koa");
const {sub,pub} = require('./redis')
const app1 = WebSocket(new Koa1());
const ctxs1 = {};

const chatList = ['channel1','channle2','channle3','channle4']

const boxList = ['channel5','channle6','channle7']
sub.subscribe(chatList[0]);
sub.subscribe(chatList[1]);
sub.subscribe(chatList[2]);
sub.subscribe(chatList[3]);

global.user = ctxs1
global.pub = pub
sub.on("subscribe", function (channel, count) {
    console.log('监听到订阅事件',channel, count)
});
//在pub的时候会触发 message事件，我们的所有业务处理基本就是靠监听它了
sub.on("message", function (channel, message) {

    var data = JSON.parse(message)

    if(typeof(data.action) != "undefined"){
        if(data.action === 'agree'){
            if (typeof(global.user[data.wsId]) != "undefined") {
                global.user[data.wsId].websocket.send(message);
            }
        }
        if(data.action === 'apply'){
            if (typeof(global.user[data.toId]) != "undefined") {
                global.user[data.toId].websocket.send(message);
            }
        }
        if(data.action === 'sendMsg'){
            console.log("sendMsg")
            global.user[data.uid].websocket.send("12333");
            return;
            if (typeof(global.user[data.toid]) != "undefined") {//在线用户存在
                var obj = {
                    action:"sendMsg",
                    msg :data.msg,
                    uid:data.uid,
                    toId:data.toid,
                    msgId:""
                }
                global.user[data.toid].websocket.send(JSON.stringify(obj));
            }
        }
    }


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
    const query = ctx.request.query
    global.user[query.id] = ctx
    ctxs1[query.id] = ctx

    ctx.websocket.on("message", (message) => {
        console.log(message)
        var data = JSON.parse(message)
        if(data.action === 'sendMsg'){//发士聊天信息
            const randomChannel = Math.ceil(Math.random()*3);
            pub.publish(chatList[randomChannel], message)
        }
        if(data.action === 'goChatList'){//发士聊天信息
            const randomChannel = Math.ceil(Math.random()*3);
            pub.publish(chatList[randomChannel], message)
        }
    });
    ctx.websocket.on("close", (message) => {
        /* 连接关闭时, 清理 上下文数组, 防止报错 */
        const aa1 = ctx.request.query
        console.log("re = "+ global.user[aa1.id].websocket.readyState)

        console.log("close"+message)
        if(message ===1001){
           console.log(message)
                //故意报错
            //sub.unsubscribe()
            //subPro.quit()
           // pub.quit();
        }
    });
    ctx.websocket.on("error", (message) => {
         console.log("error = "+message)
    });
});

module.exports = app1