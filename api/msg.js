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
    ctx.query.uid =  ctx.query.uid1
    let str = ctx.query.msg
    ctx.query.leftMsg = ctx.query.msg
    if(ctx.query.msg.length>=10&&ctx.query.msg.length<=12){
        str =  ctx.query.msg.slice(0,ctx.query.msg.length-6)
        str+="..."

    }
    if(ctx.query.msg.length>=13){
        str =  ctx.query.msg.slice(0,6)
        str+="..."
    }
    ctx.query.leftMsg = str;

    let sendObj = null;
    json.forEach(obj =>{
        if(obj.uid === ctx.query.uid){
            sendObj = obj;
        }
    })


    sendObj.action = "sendMsg";
    sendObj.msg = ctx.query.msg
    sendObj.leftMsg = str;
    sendObj.toId = ctx.query.toId;
    ctx.query.uid = ctx.query.toId;
    ctx.query.toId = "";
    msgService.sendMsg(sendObj,ctx.query)
    ctx.body =ctx.query

})
//获取我的聊天列表
router.get('/api/user/getChatUserList',async (ctx,next)=>{
    console.log(ctx.query.myId)
    var key = "chatMyff333456"+ctx.query.myId
    //var key = "game:taskIDList1"
    let list =  await msgService.getAllMyChatList(key)
    console.log(list)
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
    ctx.query.name = 'sb老祖'
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