const HttpException = require('../mid/HttpException')

const catchError = async (ctx,next) =>{
    try {

        await next();
    }catch(error){
        throw error;
        if(global.config.environment =='dev'){
            throw error;
        }a
        if(error instanceof HttpException){
            ctx.body = error
        }

    }
}


const globalUser = async (ctx,next) =>{
    var user={};//存储连接用户
    global.user = user;
    console.log("fff")
    await next();
}

module.exports = {catchError,globalUser}