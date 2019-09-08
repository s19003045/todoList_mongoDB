const express = require('express')

// 建立一個 router 物件
const router = express.Router()

// import mongoose Schema
const Todo = require('../models/todo')

// app 可使用的方法(get, post, put, delete)，router 也可以使用
// 列出全部 Todo
router.get('/', (req, res) => {
  return res.redirect('/')
})

// 新增一筆 Todo 頁面
router.get('/new', (req, res) => {

  res.render('new')
})

// 新增一筆  Todo
router.post('/', (req, res) => {
  // 以 document 的方法處理"新增""
  // // 新增一個 Todo model 實例
  // const todo = new Todo({
  //   name: req.body.name
  // })

  // // 將 todo 儲存至 資料庫
  // todo.save(err => {
  //   if (err) return console.error(err)
  //   // 重新導向回首頁
  //   return res.redirect('/')
  // })

  // 以 model 的方法處理"新增"：
  Todo.create({ name: req.body.name }, (err, todo) => {
    if (err) return console.err(err)
    return res.redirect('/')
  })
})

// 顯示一筆 Todo 的詳細內容
router.get('/:id', (req, res) => {

  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.err(err)
    return res.render('detail', { todo: todo })
  })
})


// 修改 Todo 頁面
router.get('/:id/edit', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) console.err(err)
    return res.render('edit', { todo, todo })
  })
})


// 修改 Todo
router.put('/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.name = req.body.name
    if (req.body.done === 'on') {
      todo.done = true
    } else {
      todo.done = false
    }
    todo.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/todos/${req.params.id}`)
    })
  })
})

// 刪除 Todo
router.delete('/:id/delete', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})


module.exports = router