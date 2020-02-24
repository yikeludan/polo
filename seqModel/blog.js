

const model = [
    {
        modelName:"id",
        type:"INTEGER(20)",
        primaryKey:true,
        autoIncrement:true
    },
    {
        modelName:'userId',
        type:"STRING(20)"
    },
    {
        modelName:'content',
        type:"STRING(20)"
    },
    {
        modelName:'image',
        type:"STRING(20)"
    },
    {
        modelName:'createdAt',
        type:"STRING(20)",
        unique:true
    },
    {
        modelName:'updatedAt',
        type:"STRING(20)",
        unique:true
    },
]

class blog {

    constructor(){
        this.isSeq = true;
        this.tableName = "blogs"
        this.objectModel = model
    }
}

module.exports = blog