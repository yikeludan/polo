const baseDao = require('./baseDao');
class blogDao extends baseDao {
    constructor(key){
        super(key)
        this.key = key;
    }
}

module.exports = blogDao;
