const Koa = require('koa')
const path = require('path')

const parse = require('koa-bodyparser')
const catchError = require('./mid/exception')
const InitManager = require('./untl/init')
const dbInit = require('./untl/dbInit')

const static =  require('koa-static')
const koaBody = require('koa-body');

const app = new Koa();
app.use(catchError)
app.use(parse())



app.use(static(path.join(__dirname, './static')))

InitManager.initCore(app)
dbInit.initCore();


require('./model/user')

app.listen(5000)