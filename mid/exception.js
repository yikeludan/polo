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

module.exports = catchError