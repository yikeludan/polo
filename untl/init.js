const requireDirectory = require('require-directory')
const Router = require('koa-router')
const userEx = require('../model/userEx')
const {execPool,aa,getDa} = require('../mid/rawdb')
const fs = require('fs');

class InitManager{
    static initCore(app){
        InitManager.app = app;

        InitManager.initRoutes()
        InitManager.initErrorObject()
        InitManager.loadConfig()
        InitManager.loadObject()
    }
    static initRoutes(){
        requireDirectory(module,'../api',{visit:whenLoadModule});
        function whenLoadModule(obj){
            if(obj instanceof Router){
                InitManager.app.use(obj.routes());
            }
        }
    }

    static initErrorObject(){
        const error = require('../mid/HttpException')
        global.errs = error

        var user=""//存储连接用户
        var user1=""//存储连接用户

        global.user = user;
        global.user1 = user1;

        console.log("fff")
    }

    static loadConfig(path =''){
        const configPath = path || process.cwd()+"/config/config.js"
        const config = require(configPath)
        global.db = config
    }

    static async loadObject(){
       // const ob = new userEx();
        /*ob.objectModel.forEach(mo=>{
            console.log(mo.modelName+"---"+mo.type);
        })*/
       // getDa(1)
       // const dir = await fs.readdirSync('./model/');
      /*  fs.readdir('./model/',async function(err,data){
            console.log("dir = "+data);
        })*/
      //console.log(dir)


       /* const configPath =  process.cwd()+"/model/userEx.js"
        const config = require(configPath)
        const ob = new config();
        ob.objectModel.forEach(mo=>{
            console.log(mo.modelName+"---"+mo.type);
        })*/
    }


    static getPostData(){
        exports.getPostData = function (ctx) {
            return new Promise((resolve, reject) => {
                try {
                    let str = ''
                    ctx.req.on('data', (chunk) => {
                        str += chunk
                    })
                    ctx.req.on('end', (chunk) => {
                        resolve(str)
                    })
                }catch(err){
                    reject(err)
                }
            })

        }
    }
}

module.exports = InitManager