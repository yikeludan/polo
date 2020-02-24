const {execPool,getDa,execSql} = require('../mid/rawdb')
const  userDao = require('../dao/userDao');

const fs = require('fs');
class dbInit{
    static initCore(){
        dbInit.loadObject()
    }
    static async loadObject(){
        const dirList = await fs.readdirSync('./seqModel/');
        const obMappingSql = new Map();

        const obj ={};
        obj.where = {
            id:3,

        };


        let allseqColumns = new Map();
        dirList.forEach(dirName => {
            let arraySqlColumns =[];
            let arrayModelColumns = [];
            const mapping = new Map();
            const configPath =process.cwd()+"/seqModel/"+dirName;
            const config = require(configPath)
            const ob = new config();
            if(ob.isSeq){
                arrayModelColumns = ob.objectModel

                getDa('blog',ob.tableName).then(sqlColumns => {
                    sqlColumns.forEach((column,index) =>{
                        arraySqlColumns.push(column.COLUMN_NAME)
                    })
                    arrayModelColumns.forEach((column,index) =>{
                        column.sqlColumn = arraySqlColumns[index]
                        let map = new Map();
                        map.set(column.modelName,arraySqlColumns[index])
                        column.valueMap = map;
                            mapping.set(column.modelName,arraySqlColumns[index])

                    })

                    let keyObject = {};
                    let valueObject = {}
                    keyObject =  ob.tableName;
                    valueObject.arraySqlColumns = arraySqlColumns;
                    valueObject.arrayModelColumns = arrayModelColumns;
                    valueObject.mapping = mapping;
                    allseqColumns.set(keyObject,valueObject);
                    //console.log(allseqColumns.get("user").mapping)

                    // console.log( global.allseqColumns);
                    const obj ={
                        queryType:'UPDATE',
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
                                nickName:"777"
                            },
                            where:{
                                id:25,

                            }
                        }
                    };
                  /*  const res = new userDao("user").routerSql(obj);
                   /!* res.transaction.conn.commit(function() {
                        console.log('执行成功');
                    })*!/
                   res.then(data => {
                       data.transaction.conn.commit(function() {
                           console.log('执行成功');
                       })
                       console.log(data.affectedRows)
                   })*/
                   //dbInit.appendSql(obj)
                })
            }

        })
        global.allseqColumns = allseqColumns;


    }



    static async appendSql(obj){
        const _allseqColumns = global.allseqColumns.get("user")
        const mapping = _allseqColumns.mapping;
        //console.log(_allseqColumns.arraySqlColumns.toString())


        obj.queryResultSqlAll = _allseqColumns.arraySqlColumns.toString();
        console.log(obj.queryResultSqlAll.toString())


        obj.queryResultSqlField = typeof(obj.field) ==='undefined'?null:obj.field.toString;

        const where = typeof(obj.where) === 'undefined'?false:true

        if(where){
            let whereKeyList = Object.keys(obj.where);
            let whereSql = 'where'+" "
            let whereSqlList = [];

            whereKeyList.forEach(key => {
                var value = eval("obj.where."+key);
                for(var op in value) {
                    if(typeof(value[op]) == 'string'){
                        whereSqlList.push(key+" "+op+" "+JSON.stringify(value[op]))
                    }else{
                        whereSqlList.push(key+" "+op+" "+value[op])
                    }
                }
            })
            whereSql += whereSqlList.join(' and ').toString()

            obj.whereSql = whereSql;
        }


        let insert = typeof(obj.insert) == 'undefined'?false:true
        if(insert){
            let insertKeyList = Object.keys(obj.insert);
            let insertSqlBefore =[]
            let insertSqlAfter =[]
            insertKeyList.forEach(key => {
                let sqlValue = mapping.get(key);
                insertSqlBefore.push(sqlValue)
                let value = eval("obj.insert."+key);
                if(typeof(value) === 'string'){
                    insertSqlAfter.push(JSON.stringify(value))
                }else{
                    insertSqlAfter.push(value)
                }
            })
            obj.insertSql = {}
            obj.insertSql.insertSqlBefore = insertSqlBefore;
            obj.insertSql.insertSqlAfter = insertSqlAfter;
        }
        let update = typeof(obj.update) === 'undefined'?false:true;
        if(update){
            const set = typeof(obj.update.set) === 'undefined'?false:true
            const setSqlList = []
            const setWhereList = []

            if(set){
                let setList = Object.keys(obj.update.set);
                setList.forEach(key => {
                    let sqlValue = mapping.get(key);
                    let value = eval("obj.update.set."+key);
                    if(typeof(value) === 'string'){
                        setSqlList.push(sqlValue +" = "+JSON.stringify(value))
                    }else{
                        setSqlList.push(sqlValue +" = "+value)
                    }
                })

                obj.update.setSqlList = setSqlList;
            }

            const updateWhere = typeof(obj.update.where) === 'undefined'?false:true;
            if(updateWhere){
                let whereSetList = Object.keys(obj.update.where);
                whereSetList.forEach(key => {
                    let sqlValue = mapping.get(key);
                    let value = eval("obj.update.where."+key);
                    if(typeof(value) === 'string'){
                        setWhereList.push(sqlValue +" = "+JSON.stringify(value))
                    }else{
                        setWhereList.push(sqlValue +" = "+value)
                    }
                })
                obj.update.setWhereList = setWhereList.join(" and ");
            }

        }

        console.log(obj.whereSql)
        console.log(obj.insertSql.insertSqlBefore.toString())
        console.log(obj.insertSql.insertSqlAfter.toString())
        console.log(obj.update.setSqlList)
        console.log(obj.update.setWhereList)


    }

}


module.exports = dbInit