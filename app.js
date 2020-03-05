const Koa = require('koa')
const path = require('path')
const WebSocket = require('ws');

const parse = require('koa-bodyparser')
const catchError = require('./mid/exception')
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


const wss = new WebSocket.Server({
    port:3030,
    verifyClient: yan//验证要不要给连接
})

function yan(info){
    let url = info.req.url
    // let i = url.search(6);
    // if (i<0){
    //     console.log('拒绝连接');
    //     return false;
    // }
    //console.log('通过连接' + url);
    return true;
}

var user={};//存储连接用户
const map = new Map();
console.log(1)
let online=0;//存储在线人数
wss.on('connection',function(ws,req){
    online =wss._server._connections;
    ws.send('当前在线' + online+'个连接');
    let i = req.url;//提取网址参数
    let u = i.match(/(?<=:).+?$/);              //提取发给谁
    let m = i.match(/(?<=\?)[^:]+?(?=:|$)/);    //提取我是谁,这部分代码只有第一次连接的时候运行,如果后面连接的m值相同,前面的连接会被覆盖身份
    user[m] = ws

    ws.on('message',function(msg){
        console.log('收到'+i+'的消息：'+msg+"--"+u);
        // ws.send(req.headers['sec-websocket-key'])
        // ws.send(req.url)
        if(u){
            if (user[u]){
                if (user[u].readyState===1){
                    user[u].send(msg);
                    ws.send('发送成功');
                }else{
                    ws.send('对方掉线');
                }
            }else{
                ws.send('找不到对象');
            }
        }else{//广播
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(msg);
                }
            });
        }

        if (online != wss._server._connections){
            online = wss._server._connections;
            ws.send('当前在线' + online + '个连接');
        }
        // ws.send(req.headers.origin)
        // ws.send(JSON.stringify(Array.from(wss.clients)))
        // ws.send(JSON.stringify(ws))
        // ws.send(JSON.stringify(req))
    })
})



app.listen(5000)