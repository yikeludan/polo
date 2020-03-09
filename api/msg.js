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
    var key = "chatMyff33345"+ctx.query.myId
    //var key = "game:taskIDList1"
    let list =  await msgService.getAllMyChatList(key)
    let resList = []
    list.forEach(obj =>{
        const j = JSON.parse(obj)
        resList.push(j)
    })



    ctx.body =resList
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
    let resMyObj = null;
    json.forEach(obj => {
        if(obj.name === ctx.query.name){
            resObj  = obj
        }
        if(obj.uid === ctx.query.myId){
            resMyObj  = obj
        }
    })

    resMyObj.toId = resObj.uid
    resMyObj.action = 'apply'
    msgService.applyFriend(resMyObj)
    ctx.body = 123

})

//同意好友
router.get('/api/user/agreeFriend',async (ctx,next)=>{
    let resGuestObj = null;
    let resOwnObj = null;
    json.forEach(obj => {
        if(obj.uid === ctx.query.toId){
            resGuestObj  = obj
        }
        if(obj.uid === ctx.query.myId){
            resOwnObj  = obj
        }
    })
    resGuestObj.action = 'agree'
    resOwnObj.action  = 'agree'
    msgService.agreeFriend(resGuestObj,resOwnObj)
    ctx.body = ctx.query;

})

module.exports = router