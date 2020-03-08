const Router = require('koa-router')
const router = new Router();
const{lpush,setRedis,getRedis,getlRange} =require('../mid/redis')
const MsgService = require('../service/MsgService')
const msgService = new MsgService()

router.get('/api/user/myfriendMsg',async (ctx,next)=>{
   console.log(ctx.query)
    var key = "game:taskIDList"
    const b = await getlRange(key,0,-1)

    ctx.body =b
})
//发送消息
router.get('/api/user/sendMsg',async (ctx,next)=>{
    msgService.sendMsg(ctx.query)
    ctx.body =ctx.query
})
//获取我的聊天列表
router.get('/api/user/getChatUserList',async (ctx,next)=>{
    console.log(ctx.query.myId)
    var key = "chatUserList-"+ctx.query.myId
    //var key = "game:taskIDList1"
    let list =  await msgService.getAllMyChatList(key)
    ctx.body =list
})
//获取我的好友列表
router.get('/api/user/getFriendChatList',async (ctx,next)=>{
    let list =  await msgService.getAllMyFriendList(ctx.query)
    ctx.body =list
})


//获取我和他的聊天列表
router.get('/api/user/getAllMyAndYouChatList',async (ctx,next)=>{
    let list =  await msgService.getAllMyAndYouChatList(ctx.query)
    ctx.body =list
})

//申请好友
router.get('/api/user/applyFriend',async (ctx,next)=>{
    msgService.applyFriend(ctx.query)
    ctx.body = ctx.query;

})

//同意好友
router.get('/api/user/agreeFriend',async (ctx,next)=>{
    msgService.agreeFriend(ctx.query)
    ctx.body = ctx.query;
})

module.exports = router