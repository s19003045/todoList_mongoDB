const express = require('express')
const app = express()
const port = 3000


// import mongoose & connect to mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true })
// 當 mongoose 與 mongodb 連線成功會獲得之 mongoose.connection 存成變數 db
const db = mongoose.connection

// 使用"連續"監聽器：listen to error
db.on('error', () => {
  console.log('mongoose connect error')
})

// 使用"一次性"監聽器：listen to success
db.once('open', () => {
  console.log('mongoose connect success')
})

// import model "Todo"
const Todo = require('./models/todo')


// 
app.get('/', (req, res) => {
  res.send('hello world. Who are you?')
})


// server listen
app.listen(port, () => {
  console.log(`Express server listen to http://localhost:${port}`)
})