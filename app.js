const Koa = require('koa')




const path = require('path')
var cors = require('koa2-cors');

const parse = require('koa-bodyparser')
const {catchError,globalUser} = require('./mid/exception')
const InitManager = require('./untl/init')
const dbInit = require('./untl/dbInit')

const static =  require('koa-static')
const koaBody = require('koa-body');
const appWs = require('./mid/websocket')
const app = new Koa();
app.use(catchError)
app.use(parse())
app.use(cors());



app.use(static(path.join(__dirname, './static')))
InitManager.initCore(app)
dbInit.initCore();


require('./model/user')



appWs.listen(3030);

app.listen(5000)