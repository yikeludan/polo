const Router = require('koa-router')
const router = new Router();
const {User} = require('../model/user')

router.get('/aaa',async (ctx,next)=>{
    ctx.body = 'aaa'
})


router.post('/blog/aaaa',async (ctx,next)=>{
    const headers = ctx.request.header;
    const body = ctx.request.body;
    console.log(body)
   // const error = new global.errs('为什么错误',10000)
    //throw error
    User.create(body)
    ctx.body = body
})


router.post('/user/register1',async (ctx,next)=>{
    const headers = ctx.request.header;
    const body = ctx.request.body;
    console.log(body)
    // const error = new global.errs('为什么错误',10000)
    //throw error
    const a = await User.create(body)
    console.log(a)

    ctx.body = body
})

module.exports = router