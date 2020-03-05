/* 实例化外部依赖 */
let Koa = require("koa");
const Koa1 = require("koa");
const app1 = new Koa1();

let WebSocket = require("koa-websocket");

/* 实例化 WebSocket, 实例化储存所有上线文数组 并分配监听的端口 */
let app = WebSocket(new Koa());
let ctxs = [];
let ctxs1 = {};
app1.listen(5000)
app.listen(3030);

/* 实现简单的接发消息 */
app.ws.use((ctx, next) => {
    /* 每打开一个连接就往 上线文数组中 添加一个上下文 */
    const query = ctx.request.query
    ctxs.push(ctx);
    ctxs1[query.id] =ctx

    ctx.websocket.on("message", (message) => {

        const aa = ctx.request.query
         ctxs1[aa.toid].websocket.send(message);
    });
    ctx.websocket.on("close", (message) => {
        /* 连接关闭时, 清理 上下文数组, 防止报错 */
        let index = ctxs.indexOf(ctx);
        const aa1 = ctx.request.query
        if(message ===1001){
            ctxs1[aa1.toid].websocket.send("关闭连接");

        }


        ctxs.splice(index, 1);
    });
});