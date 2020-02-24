

const model = [
    {
        modelName:"id",
        type:"INTEGER(20)",
        primaryKey:true,
        autoIncrement:true
    },
    {
        modelName:'nickName',
        type:"STRING(20)"
    },
    {
        modelName:'userEmail',
        type:"STRING(20)"
    },
    {
        modelName:'passWord',
        type:"STRING(20)"
    },
    {
        modelName:'openId',
        type:"STRING(20)",
        unique:true
    },
]

class userEx {

    constructor(){
        this.isSeq = true;
        this.tableName = "user"
        this.objectModel = model
    }
}

module.exports = userEx