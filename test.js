const redis = require("redis");
var util = require('util');

const executiveBusiness = redis.createClient(6379, '139.196.89.179');

key="game:taskIDList1";
//aaaa();
function aaaa(){
    var obj = {
        id :444,
        name:"kami"
    }
    var s = JSON.stringify(obj)
    executiveBusiness.lpush(key,s,function(err,res){
        if(err){
            console.log(err);
        } else{
            console.log("333"+util.inspect(res));
        }

    });



    executiveBusiness.lrange(key,0,-1,function(err,res){
        if(err){
            console.log(err);
        } else{

           // const b = JSON.stringify(res)
          // const d = JSON.parse(a)

            console.log(res[0].id);
        }
    });
}


function aa(){
    const obj ={};
    const ggg = 'zb'
    obj.where = {
          passWord:{
            "=": 1
          },
          name:{
            "=": 'zb'
          },
    };
    obj.insert={
        passWord:1,
        name:"33"
    }

    obj.update={
        set:{
            passWord:1,
            name:"33"
        },
        where:{
            id:'ff'
        }

    }
    const list = Object.keys(obj.where);
    const whereSql = 'where'+" "
    const whereSqlList = [];
    list.forEach(key => {
        var value = eval("obj.where."+key);
        for(var op in value) {
            if(typeof(value[op]) == 'string'){
                whereSqlList.push(key+" "+op+" "+JSON.stringify(value[op]))
            }else{
                whereSqlList.push(key+" "+op+" "+value[op])
            }
        }
    })
    console.log(whereSql+whereSqlList.join(' and ').toString())


    var data =[
        {_id:"111",name:"aaa",age:"23"},
        {_id:"222",name:"bbb",age:"25"},
        {_id:"333",name:"ccc",age:"27"}
    ];
    var zd="222";
    for(var i=0;i<=data.length;i++){
        if(data[i]._id==zd){
            data.splice(i,1);
            break;
        }
    }
    console.log(data);


}

aa()

var jsonString = '[ {"name":"天鸽"},{"name":"梅花"},{"name":"台风"} ]';

// console.log(JSON.parse(jsonString));
var jsArr = JSON.parse(jsonString);

jsArr.push({"name":"帕卡"});

console.log(jsArr[0].name);