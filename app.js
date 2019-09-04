const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

// import express-handlebars
const exphbs = require('express-handlebars')

// template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// bodyParser setting
app.use(bodyParser.urlencoded({ extended: true }))


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
  Todo.find((err, todos) => {
    if (err) return console.error(err)
    return res.render('index', { todos: todos })
  })
})

// 列出全部 Todo
app.get('/todos', (req, res) => {
  return res.redirect('/')
})

// 新增一筆 Todo 頁面
app.get('/todos/new', (req, res) => {
  // res.send('新增 Todo 頁面')
  res.render('new')


})
// 顯示一筆 Todo 的詳細內容
app.get('/todos/:id', (req, res) => {
  res.send('顯示 Todo 的詳細內容')
})

// 新增一筆  Todo
app.post('/todos', (req, res) => {
  // 新增一個 Todo model 實例
  const todo = new Todo({
    name: req.body.name
  })
  console.log(todo)
  // 將 todo 儲存至 資料庫
  todo.save(err => {
    if (err) return console.error(err)

    // 重新導向回首頁
    return res.redirect('/')
  })

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