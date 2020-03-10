const webSocket = require('ws')
const WebSocketServer = webSocket.Server;
/*const ws = new WebSocketServer({port: 7000},()=>{
    console.log("启动成功")
});*/
const ws = new webSocket.Server({port:7000},()=>{
    console.log("启动成功")
})

var clients = new Set();

var sessions = []

//刷新房间内人员信息
function updatePeer(){
    var peers = []
    clients.forEach(client => {
          var peer = {}
          if(client.hasOwnProperty("id")){
              peer.id = client.id
          }
          if(client.hasOwnProperty("name")){
              peer.name = client.name
          }
          if(client.hasOwnProperty("session_id")){
            peer.session_id = client.session_id
          }
          peers.add(peer)
    })

    var msg = {
        type:'peers',
        data:peers
    }

    clients.forEach(client => {
        send(client,JSON.stringify(msg))
    })



    }
ws.on('connection',function connection(client_self){
    clients.add(client_self)
    client_self.on('message',function(message){
        message = JSON.parse(message)
        switch(message.type){
            case 'new':{//新成员加入
                client_self.id = ""+message.id
                client_self.name = message.name
                client_self.user_agent = message.user_agent
                updatePeer()//新成员加入 通知各房间
            }
            break;

            case 'bye':{//离开房间
                var session = null;
                sessions.forEach(sess =>{
                    if(sess.id === message.id){
                        session = sess;
                    }
                })
                if(!session){
                    var msg = {
                        type:'error',
                        data:{
                            error:"Invalied"
                        }
                    }
                    send(client_self,JSON.stringify(msg))
                    return;
                }
                clients.forEach(client => {
                    if(client.session_id === message.session_id){
                        var msg = {
                            type:'bye',
                            data:{
                                session_id:message.session_id,
                                from:message.from,
                                to:(client.id === session.from? session.to: session.from)
                            }
                        }
                        send(client,JSON.stringify(msg))
                    }
                })


            }
            break;

            case 'offer':{//转发offer
                var peer = null
                clients.forEach(client => {
                    if(client.hasOwnProperty("id")&&client.id === ""+message.to){
                        peer = client;
                    }
                })
                if(peer !=null){
                    var msg = {
                        type:'offer',
                        data:{
                            to:peer.id,
                            from:client_self.id,
                            session_id:message.session_id,
                            description:message.description
                        }
                    }
                    send(client_self,JSON.stringify(msg))
                    peer.session_id = message.session_id;
                    client_self.session_id = message.session_id;

                    let session = {
                        id:message.session_id,
                        from:client_self.id,
                        to:peer.id,
                    }
                    sessions.push(session)
                }
            }
            break;

           //转发answe
            case 'answer':{
                var msg = {
                    type:'answer',
                    data:{
                        to:message.to,
                        from:client_self.id,
                        description:message.description
                    }
                }
                clients.forEach(client => {
                    if(client.id === ""+message.to&&client.session_id === ""+message.session_id){
                        send(client,JSON.stringify(msg))
                    }
                })
            }
            break;

           // 收到候选者
            case 'candidate':{
                     var msg = {
                         type:'candidate',
                         data:{
                             from:client_self.id,
                             to:message.to,
                             candidate:message.candidate
                         }
                     }
                clients.forEach(client => {
                    if(client.id === ""+message.to&&client.session_id === ""+message.session_id){
                        send(client,JSON.stringify(msg))
                    }
                })

            }
            break;
           //心跳
            case 'keepalive':{
                var msg ={
                    type:"keepalive",
                    data:{}
                }
                send(client_self,JSON.stringify(msg))
            }
            break;
        }

    })
})


function send(client,message){
    client.send(message)
}