<template>

  <div>
    <el-container style="height: 100vh">
      <el-aside style="width: 22vw">
        <div class = "searchText">
            <div class = "searchText_input"><el-input class="elin-inputZD1" v-model="input" placeholder="请输入内容"></el-input></div>
            <div class = "searchText_button">
              <el-button type="success" class="upButton" icon="el-icon-plus" circle></el-button>

            </div>

        </div>

        <div class = "chatUserList">
          <div class="chatScroList">
          <div class="oneChatList">
              <div class="chatHead">
                <el-avatar :size="35">
                  <img src="https://sf3-ttcdn-tos.pstatp.com/img/lark.avatar/da66000e46346df6b51c~72x72.webp"/>
                </el-avatar>
              </div>
              <div class="chatMessage">
                <div class="chatName">绘画盒子</div>
                <div class="chatMs">[飞书机器人]撒旦</div>
              </div>
              <div class="chatDate">3-25 16:43
              </div>
          </div>




            <div class="oneChatList">
              <div class="chatHead">
                <el-avatar :size="35">
                  <img src="https://s1.pstatp.com/ee/web-client/static/img/file_zip_msg.9d62b946.png"/>
                </el-avatar>
              </div>
              <div class="chatMessage">
                <div class="chatName">绘画盒子</div>
                <div class="chatMs">[飞书机器人]撒旦</div>
              </div>
              <div class="chatDate">3-25 16:43
              </div>
            </div>

            <div class="oneChatList">
              <div class="chatHead">
                <el-avatar :size="35">
                  <img src="https://s1.pstatp.com/ee/web-client/static/img/file_zip_msg.9d62b946.png"/>
                </el-avatar>
              </div>
              <div class="chatMessage">
                <div class="chatName">绘画盒子</div>
                <div class="chatMs">[飞书机器人]撒旦</div>
              </div>
              <div class="chatDate">3-25 16:43
              </div>
            </div>


            <div class="oneChatList">
              <div class="chatHead">
                <el-avatar :size="35">
                  <img src="https://s1.pstatp.com/ee/web-client/static/img/file_zip_msg.9d62b946.png"/>
                </el-avatar>
              </div>
              <div class="chatMessage">
                <div class="chatName">绘画盒子</div>
                <div class="chatMs">[飞书机器人]撒旦</div>
              </div>
              <div class="chatDate">3-25 16:43
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
                    <img src="https://internal-api-lark-file.feishu.cn/api/avatar/v1/7e540006916dbc00674a/72x72.webp"/>
                  </el-avatar>
                </div>
                <div class="userHeader_2">
                   <div class="userHeader_3">绘画盒子</div>
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
                       <div class="chatMsBox">
                         飞书是真正的一站式企业沟通与协作平台,整合即时沟通、日历、音视频会议、在线文档、云盘、应用中心等功能于一体,打造高效的办公方式,加速企业成长
                       </div>
                       <div class="chatMsBox">
                         飞书是真正的一站式企业沟通与协作平台,整合即时沟通、日历、音视频会议、在线文档、云盘、应用中心等功能于一体,打造高效的办公方式,加速企业成长
                       </div>

                       <div class="chatMsBox">
                         飞书是真正的一站式企业沟通与协作平台,整合即时沟通、日历、音视频会议、在线文档、云盘、应用中心等功能于一体,打造高效的办公方式,加速企业成长
                       </div>

                       <div class="chatMsBox">
                         飞书是真正的一站式企业沟通与协作平台,整合即时沟通、日历、音视频会议、在线文档、云盘、应用中心等功能于一体,打造高效的办公方式,加速企业成长
                       </div>

                       <div class="chatMsBox">
                         飞书是真正的一站式企业沟通与协作平台,整合即时沟通、日历、音视频会议、在线文档、云盘、应用中心等功能于一体,打造高效的办公方式,加速企业成长
                       </div>

                       <div class="chatMsBox">
                         飞书是真正的一站式企业沟通与协作平台,整合即时沟通、日历、音视频会议、在线文档、云盘、应用中心等功能于一体,打造高效的办公方式,加速企业成长
                       </div>

                       <div class="chatMsBox">
                         飞书是真正的一站式企业沟通与协作平台,整合即时沟通、日历、音视频会议、在线文档、云盘、应用中心等功能于一体,打造高效的办公方式,加速企业成长
                       </div>

                       <div class="chatMsBox">
                         飞书是真正的一站式企业沟通与协作平台,整合即时沟通、日历、音视频会议、在线文档、云盘、应用中心等功能于一体,打造高效的办公方式,加速企业成长
                       </div>
                       <div class="chatMsBox">
                         飞书是真正的一站式企业沟通与协作平台,整合即时沟通、日历、音视频会议、在线文档、云盘、应用中心等功能于一体,打造高效的办公方式,加速企业成长
                       </div>
                     </div>
                   </div>
                <div class="chat_2">
                  <div class="chat_2_1"><el-input style="min-height: 130px;" placeholder="请输入内容" type="textarea"
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
  export default {
    name: 'Chat',

    mounted(){
     const chatScroList =   document.querySelector(".chatScroList")
      chatScroList.addEventListener('scroll',function(){
        console.log("a")
      })
      //使聊天框滚动保持再最底部
      const scroll =   document.querySelector(".chat_1_1")
      scroll.scrollTop = scroll.scrollHeight;
    },
    data() {
      return {
        isCollapse: true,
        textarea1:'',


      };
    },
    methods: {


    }
  };
</script>

<style>

  .el-menu-vertical-demo {
    min-height: 100vh;

  }


  .el-aside {
    background-color: white;
    color: #333;
    position:relative;
  }

  .el-main {
    background-color: #E9EEF3;

  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .el-menu-item{
    color:#5cb87a;
  }
  .is-active{
    color:#5cb87a;

  }
  .aa{
    color:#5cb87a;
  }


  .ss{
    position:relative;
    left:-30px;
  }




  .flex-container{
    display:flex;
    flex-direction:row;
    width:70vw;
    line-height:60px;
    justify-content:space-around;
  }

  .flex-container4{
    display:flex;
    flex-direction:row;
    width:70vw;
    justify-content:space-around;
  }
  .flex-container1{
    display:flex;
    flex-direction:row;
    width:70vw;
    margin-left: 6px;
    line-height:60px;
    justify-content:space-around;
  }

  .elin-inputZD /deep/ .el-input__inner{
    width:200px;
    border:1px solid #5cb87a;
    color:#5cb87a;
  }

  .dataZD /deep/ .el-input__inner{
    width:200px;
    border:1px solid #5cb87a;
    color:#5cb87a;
  }
  .el-picker-panel{
    color:#5cb87a;
  }
  .el-button--primary{
    background: #5cb87a;
    border-color:#5cb87a;
  }

  .el-select-dropdown__item{
    color:#5cb87a;
  }
  .el-popper{
    margin-top: -15px;
  }
 .searchText{
    position:absolute;
    top:10px;
   left: 1vw;


 }

  .searchText_input{
    float:left;
    width:15vw;
    height: 5vh;
  }
  .elin-inputZD1 /deep/ .el-input__inner{
    width:200px;
    border:1px solid #5cb87a;
    color:#5cb87a;
    border-radius:50px;
  }
.chat_2_1 /deep/ .el-input{
  height:500px;
}
  .upButton /deep/ .el-button{
    color:#5cb87a;
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
  position:absolute;
  top:50px;
  width:257px;
  height:90vh;
  left:10px;
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
  width:11vw;
  height:7vh;

}
.chatDate{
  float:left;
  width:5.5vw;
  height:3vh;
  margin-top: 8px;
  font-size:12px;
  color:gray;

}
.chatName{
  font-size:12px;
  margin-top: 5px;
}
.chatMs{
  font-size:11px;
  margin-top: 5px;
  color:gray;

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
    border:1px solid #dee0e3;
    line-height:20px;
    padding-left:10px;
    padding-top: 5px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>
