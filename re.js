var redis = require("redis");
var sub = redis.createClient(6379, '127.0.0.1'),
    pub = redis.createClient(6379, '127.0.0.1');
var msg_count = 0;
//订阅事件的会时候触发 subscribe ，回调包含两个参数，分别为订阅的频道和总订阅数量
sub.on("subscribe", function (channel, count) {
    console.log('监听到订阅事件',channel, count)
});
//在pub的时候会触发 message事件，我们的所有业务处理基本就是靠监听它了
sub.on("message", function (channel, message) {
    console.log('监听到发布事件')
    console.log("sub channel " + channel + ": " + message);
    msg_count += 1;
    if (msg_count === 3) {
        //sub.unsubscribe()
       // sub.quit()
       // pub.quit();
    }
});

//添加三个订阅
sub.subscribe("channel0");
sub.subscribe("channel1");
sub.subscribe("channel2");
//pub.publish("channel1", "I am message to chanle1")

setInterval(function(){
    pub.publish("channel1", "I am message to chanle1")
},30)


/*
//触发频道1的订阅者
setInterval(function(){
    pub.publish("channel1", "I am message to chanle1")
},30)

//触发频道2的订阅者
setInterval(function(){
    //pub.publish("channel2", "I am message to chanle2")
},30)*/
