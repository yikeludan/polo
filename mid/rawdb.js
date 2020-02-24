const mysql = require('mysql'),
    Connection = require('mysql/lib/Connection.js');
const pool = mysql.createPool({
    host: '127.0.0.1',
    database: 'blog',
    port: 3306,
    user: 'root',
    password: 'root',
    debug: false,
    connectionLimit: 10
});


const execPool = function(sql,values) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, conn) {
            transAutoRelease(conn);
            conn.beginTransaction(function(err) {
                if (err) {
                    throw err;
                }
                conn.query(sql,values,
                    function(err, ret) {
                        if (err) {
                            console.log("err = "+err);
                            conn.rollback(function() {});
                        } else {
                            let obj = {
                                data:ret,
                                conn:conn
                            }
                            resolve(obj)

                        }
                    });
            });
        });

    })

}


function after(fn, cb) { return function() {
    fn.apply(this, arguments);
    cb();
}
}
function transAutoRelease(conn) {
    if (conn.commit == Connection.prototype.commit)
        conn.commit = after(conn.commit, release);
    if (conn.rollback == Connection.prototype.rollback)
        conn.rollback = after(conn.rollback, release);
    function release() {
        if (conn) {
            // conn.release();
          pool.releaseConnection(conn)
        }
    }
}

async function getData(val) {
    let sql1 = "insert into users(userName,password) VALUES ('11','22')"
    let sql = 'SELECT * FROM blogs where id = '+val
    let sql2 = 'select COLUMN_NAME,COLUMN_KEY,COLUMN_TYPE from information_schema.columns where table_schema=\'blog\' and table_name=\'user\';'
    let data = await execPool( sql2 )
    if(1==1){
        /*  data.conn.rollback(function() {
              console.log('fail');

          });*/
        /*if (data.conn) {
            //data.conn.release();
        }*/


        let suc = await data.conn.commit()
        console.log(suc);
        /*if (data.conn) {
            data.conn.release();
        }*/
        const results = JSON.stringify(data.data);//把results对象转为字符串，去掉RowDataPacket
        const results1 = JSON.parse(results);
        results1.forEach(ss=>{
            console.log(ss.COLUMN_NAME);
        })
    }

}

async function execSql(obj){
    let strRes = ""
    let jsonRes = ""
    let data = "";
    try {
        data = await execPool(obj.sql)
       /* strRes = JSON.stringify(data.data);//把results对象转为字符串，去掉RowDataPacket
        jsonRes = JSON.parse(strRes);*/
    }catch(err){
        data.conn.rollback(await function() {
            throw err;
        })
    }

    return data

}


async function execSqlNoTran(obj){
    let strRes = ""
    let jsonRes = ""
    let data = "";
    try {
        data = await execPool(obj.sql)
        return data;
      /*  strRes = JSON.stringify(data.data);//把results对象转为字符串，去掉RowDataPacket
        jsonRes = JSON.parse(strRes);*/
    }catch(err){
        data.conn.rollback(await function() {
            throw err;
        })
    }
   /* data.conn.commit(await function() {
        console.log('执行成功');
    })*/
    return data

}


async function getDa(tableName,val) {
    let sql1 = "insert into user(nick_name,user_email) VALUES ('11','22')"
    let sql = 'SELECT * FROM blogs where id = '+val
    let sql2 = 'select COLUMN_NAME,COLUMN_KEY,COLUMN_TYPE from information_schema.columns where table_schema="'+tableName+'" and table_name="'+val+'"'
    let data = await execPool( sql2 )
    if(1==1){

      /*  data.conn.rollback(await function() {
            console.log('success');
        })
        */
        data.conn.commit(await function() {
            console.log('success');
        })
        const results = JSON.stringify(data.data);//把results对象转为字符串，去掉RowDataPacket
        const results1 = JSON.parse(results);
        return results1;
    }

}


const aa = function(val){
    console.log("aaaaaaaa")
}

module.exports = {execPool,getDa,execSql}
