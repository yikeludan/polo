const Router = require('koa-router')
const router = new Router();
const {lpush,setRedis,getRedis,getlRange} =require('../mid/redis')
const MsgService = require('../service/msgService')
const msgService = new MsgService()
const json = require('../untl/json')

router.get('/api/user/myfriendMsg',async (ctx,next)=>{
   console.log(ctx.query)
    var key = "game:taskIDList"
    const b = await getlRange(key,0,-1)

    ctx.body =b
})
//发送消息
router.get('/api/user/sendMsg',async (ctx,next)=>{
    ctx.query.action = "sendMsg";

    msgService.sendMsg(ctx.query)
    ctx.body =ctx.query

})
//获取我的聊天列表
router.get('/api/user/getChatUserList',async (ctx,next)=>{
    console.log(ctx.query.myId)
    var key = "chatUserList-"+ctx.query.myId
    //var key = "game:taskIDList1"
    let list =  await msgService.getAllMyChatList(key)
    var obj = {
        url:"https://internal-api-lark-file.feishu.cn/api/avatar/v1/da5b0013821beadb7860/72x72.webp",
        name:"绘画盒子1",
        msg:"撒旦",
        msgId:"",
        date:"3-27 16:35",
        id:'ffff',
        leftMsg:"121",
        uid:"333",
        toId:"444"
    }
    let list1 = [];
    list1.push(obj);



    ctx.body =JSON.stringify(list1)
})
//获取我的好友列表
router.get('/api/user/getFriendChatList',async (ctx,next)=>{
    let list =  await msgService.getAllMyFriendList(ctx.query)
    //ctx.body =list
})


//获取我和他的聊天列表
router.get('/api/user/getAllMyAndYouChatList',async (ctx,next)=>{
    console.log(ctx.query)
    let list =  await msgService.getAllMyAndYouChatList(ctx.query)
    ctx.body =list
})

//申请好友
router.get('/api/user/applyFriend',async (ctx,next)=>{
    ctx.query.name = '王总'
    let resObj = null;
    json.forEach(obj => {
        if(obj.name === ctx.query.name){
            resObj  = obj
        }
    })
    resObj.action = 'apply'
    resObj.toId = ctx.query.myId
    msgService.applyFriend(resObj)
    ctx.body = 123

})

//同意好友
router.get('/api/user/agreeFriend',async (ctx,next)=>{
    msgService.agreeFriend(ctx.query)
    ctx.body = ctx.query;
})

module.exports = router