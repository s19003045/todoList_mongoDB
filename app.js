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


// route setting
app.get('/', (req, res) => {
  res.send('hello world. Who are you?')
})

// 列出全部 Todo
app.get('/todos', (req, res) => {
  res.send('列出所有 Todo')
})
// 新增一筆 Todo 頁面
app.get('/todos/new', (req, res) => {
  res.send('新增 Todo 頁面')
})
// 顯示一筆 Todo 的詳細內容
app.get('/todos/:id', (req, res) => {
  res.send('顯示 Todo 的詳細內容')
})
// 新增一筆  Todo
app.post('/todos', (req, res) => {
  res.send('建立 Todo')
})
// 修改 Todo 頁面
app.get('/todos/:id/edit', (req, res) => {
  res.send('修改 Todo 頁面')
})
// 修改 Todo
app.post('/todos/:id/edit', (req, res) => {
  res.send('修改 Todo')
})
// 刪除 Todo
app.post('/todos/:id/delete', (req, res) => {
  res.send('刪除 Todo')
})

// server listen
app.listen(port, () => {
  console.log(`Express server listen to http://localhost:${port}`)
})