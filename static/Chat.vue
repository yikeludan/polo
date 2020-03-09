<template>

  <div>

    <audio src="http://img95.699pic.com/music_sound_effect/280/804/5db15554c94ec.mp3" id="myaudio"   hidden="true"/>

    <div class = "msgBox">
      <div class = "msgBox1">
        <el-avatar :size="45">
          <img :src="applyUser.url"/>
        </el-avatar>
      </div>
      <div class = "msgBox2">
        <div class = "msgBox21">
         {{applyUser.name}}想添加你为好友
        </div>
        <div class = "msgBox22">
          <span class="sp1">  <el-button type="success" @click="agreeApply" icon="el-icon-check" circle></el-button>
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
              <el-button type="success" class="upButton" @click="applyFriend" icon="el-icon-plus" circle></el-button>

            </div>

        </div>

        <div class = "chatUserList11">
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
                       <div class="chatMsBox" v-for="(item,index) in chatMsgList">
                         {{item.msg}}
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
        myId:"",
        toId:"",
        input2:"",
        aa:[],
        applyUser:{
          name:"一颗卤蛋",
          uid:"3333",
          msg:"撒旦",
          msgId:"",
          date:"3-27 16:35",
          id:'ffff',
          leftMsg:"已成为好友",
          url:"https://sf3-ttcdn-tos.pstatp.com/img/lark.avatar/da66000e46346df6b51c~72x72.webp",
        },
        currentChatUser:{},
        chatMsgList:[],
        chatUserList:[],
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
      const id = this.$route.query.id
      this.myId = id
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
      getAllMyAndYouChatList(){
        var that = this;
        axios.get('http://127.0.0.1:5000/api/user/getAllMyAndYouChatList',{       // 还可以直接把参数拼接在url后边
          params:{
            uid:this.myId,
            toid:this.toId
          }
        }).then(function(res){
          if(res.data.length !=0){
            console.log(res.data)
            that.chatMsgList = [];
            that.chatMsgBoxDom.scrollTop = that.chatMsgBoxDom.scrollHeight;
          }

        }).catch(function (error) {
          console.log(error);
        });
      },
      getChatUserList(){
        var that = this;
        axios.get('http://127.0.0.1:5000/api/user/getChatUserList',{       // 还可以直接把参数拼接在url后边
          params:{
            myId:this.myId
          }
        }).then(function(res){
          if(res.data.length !=0){
            that.chatUserList = res.data
            console.log(that.chatUserList)
          }

        }).catch(function (error) {
           console.log(error);
        });
      },
      toggle(index){
        this.currentChatUser = this.chatUserList[index];
        this.toId = this.chatUserList[index].uid
        this.getAllMyAndYouChatList()
        var childs = this.chatMsgBoxDom.childNodes;
        for(var i = childs.length - 1; i >= 0; i--) {
          this.chatMsgBoxDom.removeChild(childs[i]);
        }
      },
      setMsgDIv(obj){
        if(this.toId != obj.toId){
          return;
        }
        var div = document.createElement('div');
        var textNode  = document.createTextNode(obj.msg)
        div.className+=" chatMsBox";
        if(obj.msg.length<="43"&&obj.msg.length>=35){
          div.style.width = "600px"
          div.style.height = "30px"
        }
        if(obj.msg.length<="35"&&obj.msg.length>=20){
          div.style.width = "500px"
          div.style.height = "30px"
        }
        if(obj.msg.length<="20"&&obj.msg.length>=10){
          div.style.width = "400px"
          div.style.height = "30px"
        }
        if(obj.msg.length<="10"&&obj.msg.length>="7"){
          div.style.width = "150px"
          div.style.height = "30px"
        }

        if(obj.msg.length<="7"){
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

        let obj = this.currentChatUser
        obj.msg = this.textarea1;
        obj.uid = this.myId;
        obj.toId = this.toId;
       // this.chatMsgList.push(obj)
        this.chatMsgBoxDom.scrollTop = this.chatMsgBoxDom.scrollHeight;
        this.textarea1 =""
       // this.websocketsend(JSON.stringify(data));

        this.pushApplyDIv();
        this.sendMsgAjax(obj);
      },
      pushApplyDIv(){
        console.log(this.msgBox)
        this.msgBox.className='msgBoxAn'
        this.myaudio.play();
      },
      agreeApply(){
        this.agreeApplyAjax()
        this.msgBox.className='msgBoxAn1'
        this.setChatList2(this.applyUser)
      },
      agreeApplyAjax(){
        var that = this;
        axios.get('http://127.0.0.1:5000/api/user/agreeFriend',{       // 还可以直接把参数拼接在url后边
          params:{
            toId:this.applyUser.uid,
            myId:this.myId
          }
        }).then(function(res){
          if(res.data.length !=0){
            console.log(res.data)
            //that.chatUserList = res.data
          }

        }).catch(function (error) {
          console.log(error);
        });
      },
      pushApplyDivFast(obj){
        this.applyUser = obj;
        this.msgBox.className='msgBoxAn'
        this.myaudio.play();
      },
      applyFriend(){
        var that = this;
        axios.get('http://127.0.0.1:5000/api/user/applyFriend',{       // 还可以直接把参数拼接在url后边
          params:{
            myId:this.myId,
            name:this.input2
          }
        }).then(function(res){
           console.log(res.data)

        }).catch(function (error) {
          console.log(error);
        });
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
       // const redata = JSON.parse(e.data);
        const redata = JSON.parse(e.data);
        if(redata.action === 'agree'){
          this.setChatList1(redata)
        }
        if(redata.action === 'apply'){
          this.pushApplyDivFast(redata)
        }
        if(redata.action === 'msg'){
          this.setMsgDIv(redata)
          this.setChatList(redata)
        }

      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
      setChatList1(obj){
        let flag = true;

        for(let i=0;i<this.chatUserList.length;i++){
          if(this.chatUserList[i].uid === obj.uid){
            this.chatUserList[i].leftMsg = obj.leftMsg;
            flag = false;
            break;
          }
        }
        if(flag){
          obj.leftMsg = "已同意请求"
          this.chatUserList.unshift(obj);
        }
      },
      setChatList(obj){
        let flag = true;
        for(let i=0;i<this.chatUserList.length;i++){
         if(this.chatUserList[i].uid === obj.toId){
            this.chatUserList[i].leftMsg = obj.leftMsg;
            flag = false;
            break;
          }
        }
        if(flag){
          this.chatUserList.unshift(obj);
        }
      },
      setChatList2(obj){
        let flag = true;
        for(let i=0;i<this.chatUserList.length;i++){
          if(this.chatUserList[i].uid === obj.toId){
            this.chatUserList[i].leftMsg = obj.leftMsg;
            flag = false;
            break;
          }
        }
        if(flag){
          obj.leftMsg = "已经是好友了"
          this.chatUserList.unshift(obj);
        }
      },
      sendMsgAjax(obj){
        var that = this;
        axios.get('http://127.0.0.1:5000/api/user/sendMsg',{       // 还可以直接把参数拼接在url后边
          params:obj
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
.chatUserList11{

  width:257px;
  height:90vh;
  overflow: hidden;

}
  .chatUserList11 > div {
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

  .msgBoxAn1{
    position:absolute;
    width:300px;
    height:100px;
    z-index:5000;
    left:75vw;
    top:60vh;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transform: translateX(300px);
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
