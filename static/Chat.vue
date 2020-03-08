<template>

  <div>

    <audio src="http://img95.699pic.com/music_sound_effect/280/804/5db15554c94ec.mp3" id="myaudio"   hidden="true"/>

    <div class = "msgBox">
      <div class = "msgBox1">
        <el-avatar :size="45">
          <img src="https://sf3-ttcdn-tos.pstatp.com/img/lark.avatar/da66000e46346df6b51c~72x72.webp"/>
        </el-avatar>
      </div>
      <div class = "msgBox2">
        <div class = "msgBox21">
         一颗卤蛋想添加你为好友
        </div>
        <div class = "msgBox22">
          <span class="sp1">  <el-button type="success" icon="el-icon-check" circle></el-button>
</span><span class="sp2">  <el-button type="danger" icon="el-icon-close" circle></el-button>
</span>
        </div>
      </div>

    </div>
    <div class="fffff"></div>
    <el-container style="height: 100vh">
      <el-aside style="width: 22vw" >
        <div class = "searchText">
            <div class = "searchText_input"><el-input class="elin-inputZD1" v-model="input" placeholder="请输入内容"></el-input></div>
            <div class = "searchText_button">
              <el-button type="success" class="upButton" icon="el-icon-plus" circle></el-button>

            </div>

        </div>

        <div class = "chatUserList">
          <div class="chatScroList">




          <div class="oneChatList" v-for="(item,index) in chatUserList" @click="toggle(index)">
              <div class="chatHead" ub = "index">
                <el-avatar :size="35">
                  <img :src="item.url"/>
                </el-avatar>
              </div>
              <div class="chatMessage">
                <div class="chatName">{{item.name}}</div>
                <div class="chatMs">{{item.leftMsg}}</div>
              </div>
              <div class="chatDate">{{item.date}}
              </div>
          </div>













          </div>
        </div>
      </el-aside>

      <el-container>
        <el-header class="header" style="width:85vw;height:80px;">
          <div class="userHeader">
                <div class="userHeader_1">
                  <el-avatar :size="45">
                    <img :src="currentChatUser.url"/>
                  </el-avatar>
                </div>
                <div class="userHeader_2">
                   <div class="userHeader_3">{{currentChatUser.name}}</div>
                   <div class="userHeader_4"><i class="el-icon-delete"></i>
                   </div>
                </div>

            <div class="userHeader_5">
              <el-button type="primary" icon="el-icon-edit" circle/>
            </div>
            <div class="userHeader_6">
              <el-button type="warning" icon="el-icon-star-off" circle/>

            </div>

          </div>


        </el-header>
        <el-main style="background: #ffff" center="false">
              <div class="chatCenter">
                   <div class="chat_1">
                     <div class="chat_1_1">


                       <div class="chatMsBox">
                         飞书是真正的一站式企业沟通与协作平台,整合即时沟通、日历、音视频会议、在线文档、云盘、应用中心等功能于一体,打造高效的办公方式,加速企业成长
                       </div>
                     </div>
                   </div>
                <div class="chat_2">
                  <div class="chat_2_1"><el-input style="min-height: 130px;"  @keyup.enter.native="sendMs" placeholder="请输入内容" type="textarea"
                                          v-model="textarea1">
                  </el-input></div>


                  <div class="chat_2_2">  <el-button type="success" icon="el-icon-picture-outline" circle></el-button>
                  </div>
                  <div class="chat_2_3"> <el-button type="danger" icon="el-icon-files" circle></el-button></div>

                </div>


              </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Chat',


    data() {
      return {
        myId:"1",
        toId:"2",
        aa:[],
        currentMyChatUser:{
          name:"",
          uid:"",
          url:"",
          myId:"",
          toId:"",
        },
        currentChatUser:{
          name:"",
          uid:"",
          url:"",
          myId:"",
          toId:"",
        },
        chatUserList:[{
          url:"https://sf3-ttcdn-tos.pstatp.com/img/lark.avatar/da66000e46346df6b51c~72x72.webp",
          name:"绘画盒子",
          leftMsg:"121",
          msg:"撒旦",
          uid:"",
          date:"3-27 16:35",
          id:'ffff'
        },
          {
            url:"https://sf3-ttcdn-tos.pstatp.com/img/lark.avatar/da66000e46346df6b51c~72x72.webp",
            name:"绘画盒子1",
            msg:"撒旦",
            date:"3-27 16:35",
            id:'ffff',
            leftMsg:"121",
            uid:"",
          }],
        isCollapse: true,
        textarea1:'',
        websock: null,
        input:"",
        scroll:null,
        chatMsgBoxDom:null,
        myaudio:"",
        msgBox:"",
        testMsg:'飞书是真正的一站式企业沟通与协作平台,整合即时沟通、日历、音视频会议、在线文档、云盘、'
      };
    },
    created() {
      this.initWebSocket();
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
    mounted(){
      const chatScroList = document.querySelector(".chatScroList")
      const scroll =   document.querySelector(".chat_1_1")
      const msgBox = document.querySelector(".msgBox");
      const myaudio =document.getElementById("myaudio");
      this.myaudio = myaudio;
      this.msgBox = msgBox;
      chatScroList.addEventListener('scroll',function(){
        console.log("a")
      })
      //使聊天框滚动保持再最底部
      scroll.scrollTop = scroll.scrollHeight;
      this.chatMsgBoxDom = scroll;
      //this.pushChatBox()
      this.getChatUserList()

    },
    methods: {
      getChatUserList(){
        var that = this;
        axios.get('http://127.0.0.1:5000/api/user/getChatUserList',{       // 还可以直接把参数拼接在url后边
          params:{
            myId:this.myId
          }
        }).then(function(res){
          if(res.data.length !=0){
            that.chatUserList = JSON.parse(res.data)
          }

        }).catch(function (error) {
           console.log(error);
        });
      },
      toggle(index){
        this.currentChatUser.name = this.chatUserList[index].name;
        this.currentChatUser.url = this.chatUserList[index].url;
        this.currentChatUser.uid = this.chatUserList[index].uid;
        var childs = this.chatMsgBoxDom.childNodes;
        for(var i = childs.length - 1; i >= 0; i--) {
          this.chatMsgBoxDom.removeChild(childs[i]);
        }
        let data = {
          action:"goSubOneChat",//sendMsg  goSubOneChat
          uid:this.myId,
          toid:"",
          msg:"初始化1",
          date:""
        }
        //this.websocketsend(JSON.stringify(data));
      },
      pushMsg(obj){
        var div = document.createElement('div');
        var textNode  = document.createTextNode(obj.msg)
        div.className+=" chatMsBox";
        if(this.textarea1.length<="43"&&this.textarea1.length>=35){
          div.style.width = "600px"
          div.style.height = "30px"
        }
        if(this.textarea1.length<="35"&&this.textarea1.length>=20){
          div.style.width = "500px"
          div.style.height = "30px"
        }
        if(this.textarea1.length<="20"&&this.textarea1.length>=10){
          div.style.width = "400px"
          div.style.height = "30px"
        }
        if(this.textarea1.length<="10"&&this.textarea1.length>="7"){
          div.style.width = "150px"
          div.style.height = "30px"
        }

        if(this.textarea1.length<="7"){
          div.style.width = "100px"
          div.style.height = "30px"
        }
        div.appendChild(textNode)
        this.chatMsgBoxDom.appendChild(div)
        this.chatMsgBoxDom.scrollTop = this.chatMsgBoxDom.scrollHeight;
      },
      sendMs(value){
        var div = document.createElement('div');
        var textNode  = document.createTextNode(this.textarea1)
        div.className+=" chatMsBox";
        if(this.textarea1.length<="43"&&this.textarea1.length>=35){
          div.style.width = "600px"
          div.style.height = "30px"
        }
        if(this.textarea1.length<="35"&&this.textarea1.length>=20){
          div.style.width = "500px"
          div.style.height = "30px"
        }
        if(this.textarea1.length<="20"&&this.textarea1.length>=10){
          div.style.width = "400px"
          div.style.height = "30px"
        }
        if(this.textarea1.length<="10"&&this.textarea1.length>="7"){
          div.style.width = "150px"
          div.style.height = "30px"
        }

        if(this.textarea1.length<="7"){
          div.style.width = "100px"
          div.style.height = "30px"
        }

        div.appendChild(textNode)
        this.chatMsgBoxDom.appendChild(div)
        this.chatMsgBoxDom.scrollTop = this.chatMsgBoxDom.scrollHeight;

        let data = {
          action:"sendMsg",//sendMsg
          uid:this.myId,
          toid:"1",
          msg:this.textarea1,
          date:""
        }
        this.textarea1 =""
       // this.websocketsend(JSON.stringify(data));

        this.pushApplyDIv();
        this.getFriends();
      },
      pushApplyDIv(){
        console.log(this.msgBox)
        this.msgBox.className='msgBoxAn'
        this.myaudio.play();
      },
      pushChatBox(){
        const chatList = document.querySelectorAll(".oneChatList")
        var that = this;
        var inn = null;
        for (var i = 0; i < chatList.length; i++) {
          var aa = i;
          chatList[i].addEventListener('click',function(e,aa){

            const userIndex = this.getAttribute('ub')
            console.log(this)
            var childs = that.chatMsgBoxDom.childNodes;
            for(var i = childs.length - 1; i >= 0; i--) {
              that.chatMsgBoxDom.removeChild(childs[i]);
            }

          });
        }

      },

      initWebSocket(){ //初始化weosocket
        const wsuri = "ws://127.0.0.1:3030?id="+this.myId+"&toid=2";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        let data = {
          action:"initChatList",//sendMsg
          uid:this.myId,
          toid:"",
          msg:"初始化",
          date:""
        }
        this.websocketsend(JSON.stringify(data));
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收
        const redata = JSON.parse(e.data);
        console.log(e.data)
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
      setChatList(obj){
        for(var i=0;i<=this.chatUserList.length;i++){
          if(chatUserList[i].uid==obj.uid){
             chatUserList.splice(i,1);
             break;
          }
        }
        chatUserList.unshift(obj);
      },
      getFriends(){
        var that = this;
        axios.get('http://127.0.0.1:5000/api/user/myfriendMsg',{       // 还可以直接把参数拼接在url后边
          params:{
            title:'眼镜'
          }
        }).then(function(res){
          that.aa = res.data

        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  };
</script>

<style>



  .el-aside {
    background-color: white;
    color: #333;
    line-height: 1px;
    text-align: left;
  }












 .searchText{

   margin-top:10px;
   margin-left: 5px;

 }

  .searchText_input{
    float:left;
    width:15vw;
    height: 5vh;
  }


  .searchText_button{
    float:left;
    width: 2.5vw;
    height:2.5vw;
    display: block;
    margin-left:15px;
    color:black;
  }
.chatUserList{

  width:257px;
  height:90vh;
  overflow: hidden;

}
  .chatUserList > div {
    /* 子容器比父容器的宽度多 17 px, 经测正好是滚动条的默认宽度 */
    width:267px;

    height: 100vh;
    overflow-y: scroll;
  }


.oneChatList{
  width:21vw;
  height:10vh;
  margin-top:10px;
  margin-left: 5px;

}

  .oneChatList:hover {
    background-color:lightgrey;
    cursor:pointer;
  }
.chatHead{
  float:left;
  width:3vw;
  height:7vh;
}

.chatMessage{
  float:left;
  width:130px;
  height:40px;
  margin-left: 5px;

}
.chatDate{
  float:left;
  width:60px;
  height:15px;
  margin-top:12px;
  font-size:12px;
  color:gray;

}
.chatName{
  font-size:12px;
  width:100px;
  height:10px;
  margin-top: 10px;

}
.chatMs{
  font-size:11px;
  margin-top: 7px;
  color:gray;
  width:100px;
  height:10px;


}
.header{
  border-bottom:1px solid #dee0e3

}


.userHeader_1{
  float:left;
  width:50px;
  height:50px;
  margin-top: 10px;

}
.userHeader_2{
 float:left;
 margin-top: 10px;
  margin-left: 10px;
  width:250px;
  height:50px;

}
.userHeader_3{
  margin-top: 5px;
  font-weight:900;
}

.userHeader_4{
  margin-top: 8px;

}
  .userHeader_5{
    float:left;
    width:40px;
    height:40px;
    margin-left: 450px;
    margin-top: 25px;

  }
  .userHeader_6{
    float:left;
    width:50px;
    height:40px;
    margin-left: 5px;
    margin-top: 18px;
    margin-top: 25px;

  }

  .chat_1{
    width: 970px;
    height: 380px;
    overflow: hidden;
    margin-left: -20px;
  }

  .chat_1_1 {
    /* 子容器比父容器的宽度多 17 px, 经测正好是滚动条的默认宽度 */
    width: 987px;
    height: 380px;
    overflow-y: scroll;

  }

  .chat_2{
    width: 910px;
    height: 80px;

    margin-left: -20px;
    margin-top:15px;
  }
  .chat_2_1{
    width: 790px;
    height: 80px;
    float:left

  }

  .chat_2_2{
    width: 40px;
    height: 40px;
    float:left;
    margin-top:18px;
    margin-left: 10px;
  }
  .chat_2_3{
    width: 50px;
    height: 40px;
    margin-top:18px;

    float:left

  }
  .chatMsBox{
    margin-top:10px;
    width:700px;
    height:50px;
    margin-right:-20px;
    border:1px solid #dee0e3;
    line-height:20px;
    padding-left:10px;
    padding-top: 5px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .fffff{
    position:absolute;
    width:100vw;
    height:100vh;
    background:black;
    z-index: 5000;
    opacity:0.4;
    display:none;
    filter:alpha(opacity=40); /* 针对 IE8 以及更早的版本 */
  }
  .span1{
    background:firebrick;
    width:30px;
    height:30px;
  }

   .msgBoxAn{
     position:absolute;
     width:300px;
     height:100px;
     z-index:5000;
     left:75vw;
     top:60vh;
     border-radius: 10px;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     transform: translateX(-30px);
     transition: all 0.5s;
     transition-timing-function:ease-out;
   }
  .msgBox{
    position:absolute;
    width:300px;
    height:100px;
    z-index:5000;
    left:100vw;
    top:60vh;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)

  }
  .msgBox1{
    width:40px;
    height:40px;
    float:left;
    margin-top:25px;
    margin-left:25px;

  }
  .msgBox2{
    float:left;
    width:200px;
    height:70px;

  }

  .msgBox21{
    width:200px;
    line-height: 40px;
    text-align: center;

  }
  .msgBox22{
    width:200px;
    height:30px;

  }
  .msgBox3{
    float:left
  }
  .sp1{
    margin-left: 50px;
  }
  .sp2{
    margin-left: 40px;
  }
</style>
