const express = require('express')
const app = express()
const port = 3000
// express 4.0 以上 已內建 body-parser 套件，所以可選擇性 npm install body-parser
const bodyParser = require('body-parser')
// import express-handlebars
const exphbs = require('express-handlebars')
// import method-override
const methodOverride = require('method-override')
// import mongoose & connect to mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true })
// 當 mongoose 與 mongodb 連線成功會獲得之 mongoose.connection 存成變數 db
const db = mongoose.connection
// import model "Todo"
const Todo = require('./models/todo')
// import express-session
const session = require('express-session')

// static file setting
app.use(express.static('public'))

// set session
app.use(session({
  secret: 'hello world',
  resave: false,
  saveUninitialized: true,
}))

// template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// bodyParser setting
app.use(bodyParser.urlencoded({ extended: true }))
// app.use('/',bodyParser.urlencoded({ extended: true }))
// app.use()裡的第一個參數 path 被省略，因為 path 的預設是 '/'，所以，會針對收到的每一個 request 執行。 


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// app.use('/',methodOverride('_method'))
// app.use()裡的第一個參數 path 被省略，因為 path 的預設是 '/'，所以，會針對收到的每一個 request 執行。 



// 使用"連續"監聽器：listen to error
db.on('error', () => {
  console.log('mongoose connect error')
})

// 使用"一次性"監聽器：listen to success
db.once('open', () => {
  console.log('mongoose connect success')
})



// --------------route setting--------------

app.use('/', require('./routes/home'))

app.use('/todos', require('./routes/todos'))

// Users login/register/logout
app.use('/users', require('./routes/users'))

// server listen
app.listen(port, () => {
  console.log(`Express server listen to http://localhost:${port}`)
})