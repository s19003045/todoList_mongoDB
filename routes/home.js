const express = require('express')

// 建立一個 router 物件
const router = express.Router()

// import mongoose Schema
const Todo = require('../models/todo')

// 載入 auth middleware 裡的 authenticated 方法
const { authenticated } = require('../config/auth')

// setting route for home page
router.get('/', authenticated, (req, res) => {
  Todo.find({})
    .sort({ name: 'asc' })
    .exec((err, todos) => {
      if (err) return console.error(err)
      return res.render('index', { todos: todos })
    })
})

module.exports = router