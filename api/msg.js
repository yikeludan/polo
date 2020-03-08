const Router = require('koa-router')
const router = new Router();

router.get('/api/user/myfriendMsg',async (ctx,next)=>{
console.log(123)
ctx.body =123

})


module.exports = router