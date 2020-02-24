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
}

aa()