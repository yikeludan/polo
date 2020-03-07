const Router = require('koa-router')
const {User} = require('../model/user')
const router = new Router();
const {db}  =require('../mid/db')
const {execPool} =require('../mid/rawdb')
const Sequelize = require('sequelize')

const userDao = require('../dao/userDao')
const blogDao = require('../dao/blogDao')

const Op = Sequelize.Op;


router.post('/user/register',async (ctx,next)=>{
   // global.pub.publish("channel1", "123")
    const body = ctx.request.body;
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


    const obj1 ={
        queryType:'INSERT',
        where:{
            userId:{
                "=": 1
            },
            image:{
                "=": '1'
            }
        },
        insert:{
            passWord:1,
            nickName:"33"
        },
        update:{
            set:{
                image:'2'
            },
            where:{
                id:1,

            }
        }
    };

            const res = await new userDao("user").routerSql(obj1);
            console.log(res)
            res.transaction.conn.commit(function() {
                        console.log('执行成功');
            })


   /* const res = await new blogDao("blogs").routerSql(obj1);
    res.transaction.conn.commit(function() {
        console.log('执行成功');
    })*/

    ctx.body = "1"

    //console.log(body)
    //User.create(body)


})


router.post('/user/queryOne',async (ctx,next)=>{
    const body = ctx.request.body;
    console.log(body)
    const user = await User.findOne({
        where: {
            openId:body.openId
        }
    })

    ctx.body = user
})


router.post('/user/queryAll',async (ctx,next)=>{
    const body = ctx.request.body;
    console.log(body)
    const user = await User.findAll({
        where: {
            passWord:{
                [Op.in]: [1, 2]
            }
        }
    })

    ctx.body = user
})


router.post('/user/queryGroup',async (ctx,next)=>{
    const body = ctx.request.body;
    console.log(body)
//////SELECT `name`, sum(`price`) AS `sum` FROM `orders` AS `Orders` GROUP BY name HAVING COUNT('name')>1;
    const user= await User.findAll(
        {attributes:
                ['name',
                [sequelize.fn('SUM', sequelize.col('price')), 'sum']],
                group:'name', having:['COUNT(?)>?', 'name', 1], raw:true})

    ctx.body = user
})



router.post('/user/queryLike',async (ctx,next)=> {
    const body = ctx.request.body;
    /* console.log(body)
     const user = await User.update(
         { passWord:'12333'},
         { where:
                 { openId:body.openId }
         }
     );*/


    return db.transaction(function (t) {
        const aa = 43
        return db.query("UPDATE user SET pass_word = "+body.nickName+" WHERE open_id = 'WXFGH1111' ",{transaction: t}).then((results, metadata) => {
         const error = new global.errs('为什么错误',10000)
           // throw error
            ctx.body = results
        })


       /* return User.update(
            { passWord:'556'},
            { where: { openId:body.openId }},
            {transaction: t}).then(function (user) {
                ctx.body = user
        });*/
    });

    //ctx.body = body

})




router.post('/user/queryRaw',async (ctx,next)=>{
    const body = ctx.request.body;
    console.log(body)
    const user = await db.query('SELECT * FROM user WHERE nick_name = ?',
        { replacements: ['kami'], type: db.QueryTypes.SELECT }
    )
    ctx.body = user

})

router.post('/user/queryTable',async (ctx,next)=>{
   /* const body = ctx.request.body;
    console.log(body)
    const user = await db.query('select COLUMN_NAME,COLUMN_KEY,COLUMN_TYPE from information_schema.columns where table_schema=\'blog\' and table_name=\'user\'',
        {type: db.QueryTypes.SELECT }
    )
    ctx.body = user*/


    let sql2 = 'select COLUMN_NAME,COLUMN_KEY,COLUMN_TYPE from information_schema.columns where table_schema=\'blog\' and table_name=\'user\';'
    let data = await execPool( sql2 )
    if(1==1){
        /*  data.conn.rollback(function() {
              console.log('fail');

          });*/
        /*if (data.conn) {
            //data.conn.release();
        }*/


        data.conn.commit(function() {
            console.log('success');
        })
        /*if (data.conn) {
            data.conn.release();
        }*/
        const results = JSON.stringify(data.data);//把results对象转为字符串，去掉RowDataPacket
        const results1 = JSON.parse(results);
        ctx.body = global.allseqColumns.get('user')
        //console.log(global.allseqColumns.get('user'))
    }



})


module.exports = router