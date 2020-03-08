const redis = require("redis");
var util = require('util');

const sub = redis.createClient(6379, '139.196.89.179');
const pub = redis.createClient(6379, '139.196.89.179');
const executiveBusiness = redis.createClient(6379, '139.196.89.179');

function setRedis(key ,value) {
    if(typeof value === 'object'){
        value = JSON.stringify(value)
    }
    executiveBusiness.set(key,value,redis.print)
}

function rpush(key,obj){
    var s = JSON.stringify(obj)
    executiveBusiness.rpush(key,s,function(err,res){
        if(err){
            console.log(err);
        } else{
            console.log("333"+util.inspect(res));
        }
    });
}


function lpush(key,obj){
    var s = JSON.stringify(obj)
    executiveBusiness.lpush(key,s,function(err,res){
        if(err){
            console.log(err);
        } else{
            console.log("333"+util.inspect(res));
        }
    });
}

function getRedis(key) {
    const promise = new Promise((resolve,reject)=> {
        executiveBusiness.get(key,(err,val) =>{
            if(err){
                reject(err)
                return;
            }
            if(val === null){
                resolve(null)
                return;
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            }catch (e) {
                reject(e)
            }
        })
    })
    return promise;
}


function getlRange(key,val1,val2) {
    const promise = new Promise((resolve,reject)=> {
        executiveBusiness.lrange(key,val1,val2,function(err,val){
            if(err){
                reject(err)
                return;
            }
            if(key === null){
                resolve(null)
                return;
            }
            try {
                resolve(
                    val
                )
            }catch (e) {
                reject(val)
            }
        })
    })
    return promise;
}






module.exports ={
    sub,pub,lpush,rpush,setRedis,getRedis,getlRange
}