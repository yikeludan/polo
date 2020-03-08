const redis = require("redis");
const sub = redis.createClient(6379, '139.196.89.179');
const pub = redis.createClient(6379, '139.196.89.179');
const executiveBusiness = redis.createClient(6379, '139.196.89.179');

function setRedis(key ,value) {
    if(typeof value === 'object'){
        value = JSON.stringify(value)
    }
    executiveBusiness.set(key,value,redis.print)
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
                reject(val)
            }
        })
    })
    return promise;
}




module.exports ={
    sub,pub
}