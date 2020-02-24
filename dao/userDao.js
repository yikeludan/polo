const baseDao = require('./baseDao');
class userDao extends baseDao {
   constructor(key){
     super(key)
     this.key = key;
   }
}

module.exports = userDao;
