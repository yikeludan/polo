/* 实例化外部依赖 */
let Koa = require("koa");
let WebSocket = require("koa-websocket");

/* 实例化 WebSocket, 实例化储存所有上线文数组 并分配监听的端口 */
let app = WebSocket(new Koa());
let ctxs = [];
let ctxs1 = {};

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
        ctxs.splice(index, 1);
    });
});