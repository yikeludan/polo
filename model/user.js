const {db}  =require('../mid/db')

const {Sequelize,Model}  =require('Sequelize')

class User extends Model{

}

User.init({
    id:{
        type:Sequelize.INTEGER(20),
        primaryKey:true,
        autoIncrement:true
    },
    nickName:Sequelize.STRING(20),
    userEmail:Sequelize.STRING(20),
    passWord:Sequelize.STRING(20),
    openId:{
        type:Sequelize.STRING(64),
        unique:true
    }
},{
    sequelize:db,
    tableName:'user'
})

module.exports = {User}