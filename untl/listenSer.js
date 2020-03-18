var net = require("net");

// net.Socket,
var sock = net.connect({
    port: 5000,
    host: "139.196.89.179",
}, function() {
    console.log('connected to server!');
});

// 连接成功调用的事件
sock.on("connect",function() {
    console.log("connect success");
});
// end

// 有错误发生调用的事件
sock.on("error", function(e) {
    console.log("error", e);
});

// socket关闭的事件
sock.on("close", function() {
    console.log("close");
});

// 对方发送了关闭数据包过来的事件
sock.on("end", function() {
    console.log("end event");
});

// 当有数据发生的时候，调用;
sock.on("data", function(data) {
    console.log(data);
});

module.exports   = sock