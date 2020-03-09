const{pub,lpush,rpush,setRedis,getRedis,getlRange} =require('../mid/redis')
const chatList = ['channel1','channle2','channle3','channle4']

class MsgService{
    async getAllMyChatList(key){
        let list = await getlRange(key,0,-1)
        return list;
    }
    async getAllMyAndYouChatList(obj){

        let MytoYourKey = "chat"+obj.uid+"&&"+obj.toid
        let list = await getlRange(MytoYourKey,0,-1)
        return list;
    }


    async getAllMyFriendList(obj){
        let MytoYourKey = "chatOss"+obj.uid
        let list = await getlRange(MytoYourKey,0,-1)
        return list;
    }

    async sendMsg(obj){
        var message = JSON.stringify(obj)

        let MytoYourKey = "chat"+obj.uid+"&&"+obj.toid
        let MyChatListKey = "chatMy"+obj.uid
        //将信息发送给某人出去
        const randomChannel = Math.ceil(Math.random()*3);
        pub.publish(chatList[randomChannel], message);
       //将信息存储到我与他的聊天记录里
        lpush(MytoYourKey,obj)
        //将信息存进我的聊天列表里
        rpush(MyChatListKey,obj)
    }
     applyFriend(obj){
        var message = JSON.stringify(obj)
        //将信息发送给某人出去
        const randomChannel = Math.ceil(Math.random()*3);
        pub.publish(chatList[randomChannel], message);
    }

    async agreeFriend(obj){
        var message = JSON.stringify(obj)
        let MytoYourKey = "chatOss"+obj.uid
        let MyChatListKey = "chatMy"+obj.uid
        //将信息发送给某人出去
        const randomChannel = Math.ceil(Math.random()*3);
        pub.publish(chatList[randomChannel], message);
        //将信息存储到我的好友列表
        lpush(MytoYourKey,obj)
        //将信息存进我的聊天列表里
        lpush(MyChatListKey,obj)
    }


}

module.exports = MsgService