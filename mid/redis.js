const redis = require("redis");
const sub = redis.createClient(6379, '139.196.89.179');
const pub = redis.createClient(6379, '139.196.89.179');

module.exports ={
    sub,pub
}