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
                <img src="https://internal-api-lark-file.feishu.cn/api/avatar/v1/7e540006916dbc00674a/72x72.webp"/>
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
                <img src="https://internal-api-lark-file.feishu.cn/api/avatar/v1/7e540006916dbc00674a/72x72.webp"/>
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
                  <img src="https://internal-api-lark-file.feishu.cn/api/avatar/v1/7e540006916dbc00674a/72x72.webp"/>
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
                  <img src="https://internal-api-lark-file.feishu.cn/api/avatar/v1/7e540006916dbc00674a/72x72.webp"/>
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
                  <img src="https://internal-api-lark-file.feishu.cn/api/avatar/v1/7e540006916dbc00674a/72x72.webp"/>
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
                  <img src="https://internal-api-lark-file.feishu.cn/api/avatar/v1/7e540006916dbc00674a/72x72.webp"/>
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
                  <img src="https://internal-api-lark-file.feishu.cn/api/avatar/v1/7e540006916dbc00674a/72x72.webp"/>
                </el-avatar>
              </div>
              <div class="chatMessage">
                <div class="chatName">绘画盒子</div>
                <div class="chatMs">[飞书机器人]撒旦</div>
              </div>
              <div class="chatDate">3-25 111
              </div>
            </div>
            <div class="oneChatList">
              <div class="chatHead">
                <el-avatar :size="35">
                  <img src="https://internal-api-lark-file.feishu.cn/api/avatar/v1/7e540006916dbc00674a/72x72.webp"/>
                </el-avatar>
              </div>
              <div class="chatMessage">
                <div class="chatName">绘画盒子</div>
                <div class="chatMs">[飞书机器人]撒旦</div>
              </div>
              <div class="chatDate">3-25 111
              </div>
            </div>

            <div class="oneChatList">
              <div class="chatHead">
                <el-avatar :size="35">
                  <img src="https://internal-api-lark-file.feishu.cn/api/avatar/v1/7e540006916dbc00674a/72x72.webp"/>
                </el-avatar>
              </div>
              <div class="chatMessage">
                <div class="chatName">绘画盒子</div>
                <div class="chatMs">[飞书机器人]撒旦</div>
              </div>
              <div class="chatDate">3-25 111
              </div>
            </div>



            <div class="oneChatList">
              <div class="chatHead">
                <el-avatar :size="35">
                  <img src="https://internal-api-lark-file.feishu.cn/api/avatar/v1/7e540006916dbc00674a/72x72.webp"/>
                </el-avatar>
              </div>
              <div class="chatMessage">
                <div class="chatName">绘画盒子</div>
                <div class="chatMs">[飞书机器人]撒旦</div>
              </div>
              <div class="chatDate">3-25 111
              </div>
            </div>

            <div class="oneChatList">
              <div class="chatHead">
                <el-avatar :size="35">
                  <img src="https://internal-api-lark-file.feishu.cn/api/avatar/v1/7e540006916dbc00674a/72x72.webp"/>
                </el-avatar>
              </div>
              <div class="chatMessage">
                <div class="chatName">绘画盒子</div>
                <div class="chatMs">[飞书机器人]撒旦</div>
              </div>
              <div class="chatDate">3-25 333
              </div>
            </div>







          </div>
        </div>
      </el-aside>

      <el-container>
        <el-header style="width:85vw">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1" class="aa">处理中心</el-menu-item>
            <el-submenu index="2" >
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" >消息中心</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
          </el-menu>
          <div class="line"></div>


        </el-header>
        <el-main style="background: #ffff" center="false">
          <div class="flex-container">
            <div class="flex-item"><el-input class="elin-inputZD" v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="flex-item"><el-input class="elin-inputZD" v-model="input" placeholder="请输入内容"/></div>
            <div class="flex-item"><el-input class="elin-inputZD" v-model="input" placeholder="请输入内容"/></div>
          </div>

          <div class="flex-container1">
            <el-date-picker class="dataZD"
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
            </el-date-picker>

            <el-date-picker class="dataZD"
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
            </el-date-picker>

            <el-select class="elSZD" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </div>

          <div class="flex-container">
            <div class="flex-item">    <el-button type="primary" >立即创建</el-button>

            </div>
          </div>

          <div class="flex-item">
            <el-table border @select="ffff" ref="multipleTable" tooltip-effect="dark"  @selection-change="handleSelectionChange"
                      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            >
              <el-table-column @click="fff"
                               type="selection"

                               width="55">
              </el-table-column>
              <el-table-column
                label="Date"
                prop="date">
              </el-table-column>
              <el-table-column
                label="Name"
                prop="name">
              </el-table-column>
              <el-table-column
                label="Name2"
                prop="name">
              </el-table-column>
              <el-table-column
                label="Name3"
                prop="name">
              </el-table-column>
              <el-table-column label="Name1">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="open">Edit</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @current-change="ggg"
                           background
                           layout="prev, pager, next"
                           :total="1000">
            </el-pagination>
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
     /* const checkList =   document.querySelectorAll(".oneChatList")
      for (var i = 0; i < checkList.length; i++) {
        checkList[i].addEventListener('click', function(){
          alert(this.innerHTML);
        });
      }*/


    },
    data() {
      return {
        isCollapse: true,
        activeIndex: '1',
        activeIndex2: '1',
        input: '',
        checkList: ['选中且禁用','复选框 A'],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],

        value:'',
        value1:'',
        tableData: [{
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
        search: ''

      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSelectionChange(index, row){

      },
      ggg(value){
        if(value ===5){
          console.log(this.tableData[0].name)
          this.tableData[0].date = '2016-04-03'
          this.tableData[0].name = '2016-04-03'
        }
      },
      ffff(selection, row){
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      fff(e){
        console.log(11);
      },
      open() {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
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
  width:21vw;
  height:90vh;
  left:10px;
  overflow: hidden;

}
  .chatUserList > div {
    /* 子容器比父容器的宽度多 17 px, 经测正好是滚动条的默认宽度 */
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


</style>
