# polo
###基于node.js的 企业开发框架

####1.0 手写了 轻量级的node orm mysql 框架代码 示例
   const obj ={
           queryType:'SELECTALL',
           where:{
               passWord:{
                   "=": 22
               },
               nickName:{
                   "=": '11'
               }
           },
           insert:{
               passWord:1,
               nickName:"33"
           },
           update:{
               set:{
                   passWord:1,
                   nickName:"888"
               },
               where:{
                   id:25,

               }
           }
       };

        const res = await new userDao("user").routerSql(obj1);
                   console.log(res)
                   res.transaction.conn.commit(function() {
                               console.log('执行成功');
        })

####1.01 加入了移动端页面惯性滚动和回弹组件
