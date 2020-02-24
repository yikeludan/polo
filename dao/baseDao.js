const {execPool,getDa,execSql} = require('../mid/rawdb')


class baseDao {
    constructor(key){
        this.key = key;
    }

    async findAll(obj){
        let strRes = ""
        let jsonRes = ""
        let resSql = "SELECT"
        let queryBefore = obj.queryResultSqlAll.toString();
        let queryAfter = obj.whereSql;
        let returnRes = {}
        let res = "";
         try {
             resSql  +=" "+ queryBefore+" FROM "+this.key+" "+queryAfter;
             let resObj = {};
             resObj.sql = resSql;
             res = await execSql(resObj);
             strRes = JSON.stringify(res.data);//把results对象转为字符串，去掉RowDataPacket
             jsonRes = JSON.parse(strRes);
             returnRes.queryData = jsonRes
         }catch (e) {
              throw e;
         }
         res.conn.commit(await function() {
            console.log('执行成功');
         })
        return returnRes;
     }

    async findOne(obj){
        let strRes = ""
        let jsonRes = ""
        let resSql = "SELECT"
        let queryBefore = obj.queryResultSqlAll.toString();
        let queryAfter = obj.whereSql;
        let returnRes = {}
        let res = "";
        try {
            resSql  +=" "+ queryBefore+" FROM "+this.key+" "+queryAfter;
            let resObj = {};
            resObj.sql = resSql;
            res = await execSql(resObj);
            strRes = JSON.stringify(res.data);//把results对象转为字符串，去掉RowDataPacket
            jsonRes = JSON.parse(strRes);
            returnRes.queryData = jsonRes;
        }catch (e) {
            throw e;
        }
        res.conn.commit(await function() {
            console.log('执行成功');
        })
        return returnRes;
    }

    async countAll(obj){

    }


    async insert(obj){
        let strRes = ""
        let jsonRes = ""
        let res = ""
        let returnRes = {}
        let resSql = "INSERT INTO "+this.key+" "
        let insertBefore =  obj.insertSql.insertSqlBefore.toString()
        let insertAfter = obj.insertSql.insertSqlAfter.toString();
        try {
            resSql+="("+insertBefore+")"+" VALUES "+"("+insertAfter+")"
            let resObj = {};
            resObj.sql = resSql;
            res = await execSql(resObj);
            strRes = JSON.stringify(res.data);//把results对象转为字符串，去掉RowDataPacket
            jsonRes = JSON.parse(strRes);

        }catch (e) {
            throw e;
        }

        returnRes.insertId = jsonRes.insertId;
        returnRes.transaction = res;

        /*res.conn.commit(await function() {
            console.log('执行成功');
        })*/
        return  returnRes;
    }


    async update(obj){
        let strRes = ""
        let jsonRes = ""
        let res = ""
        let returnRes = {}
        let resSql = "UPDATE "+this.key+" SET "
        let updateBefore =  obj.update.setSqlList.toString()
        let updateAfter = obj.update.setWhereList.toString();

        try {
            resSql += updateBefore+" "+" WHERE "+updateAfter;
            let resObj = {};
            resObj.sql = resSql;
            res = await execSql(resObj);
            strRes = JSON.stringify(res.data);//把results对象转为字符串，去掉RowDataPacket
            jsonRes = JSON.parse(strRes);

        }catch (e) {
            throw e;
        }
        returnRes.affectedRows = jsonRes.affectedRows;
        returnRes.transaction = res;
        return returnRes;

    }

    async routerSql(obj){
        let result ;
        await this.appendSql(obj);
        switch (obj.queryType) {
            case 'SELECTONE':
               result = await this.findOne(obj);
               break
            case 'SELECTALL':
               result =  await this.findAll(obj);
               break
            case "INSERT":
                result = await this.insert(obj);
               break
            case 'UPDATE':
                result = await this.update(obj);
               break
            case 'DELETE':
               break
            default:
               throw new global.errs('obj.queryType not found',40000)
        }

        return result;
    }


    async appendSql(obj){
        let map = new Map();
        map = global.allseqColumns;
        const _allseqColumns = map.get(this.key)


        const mapping = _allseqColumns.mapping;

        obj.queryResultSqlAll = _allseqColumns.arraySqlColumns.toString();
        obj.queryResultSqlField = typeof(obj.field) === 'undefined'?null:obj.field.toString();

        const where = typeof(obj.where) == 'undefined'?false:true
        if(where){
             let whereKeyList = Object.keys(obj.where);
             let whereSql = 'where'+" "
             let whereSqlList = [];
             whereKeyList.forEach(key => {
                 let value = eval("obj.where."+key);
                 let sqlValue = mapping.get(key);

                 for(var op in value) {
                    if(typeof(value[op]) == 'string'){
                        whereSqlList.push(sqlValue+" "+op+" "+JSON.stringify(value[op]))
                    }else{
                        whereSqlList.push(sqlValue+" "+op+" "+value[op])
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

    }

}

module.exports = baseDao;