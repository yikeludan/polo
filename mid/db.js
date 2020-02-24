const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    "blog",
    "root",
    "root",{
        dialect:'mysql',
        host:"localhost",
        port:"3306",
        timezone:"+08:00",
        logging:false,

        define:{
            timestamp:false,
            paranoid:true,
            createdAt:'created_at',
            updatedAt:'updated_at',
            deletedAt:'deleted_at',
            underscored:true
        }


})
sequelize.sync()
module.exports = {
    db:sequelize
}