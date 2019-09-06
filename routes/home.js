const express = require('express')

// 建立一個 router 物件
const router = express.Router()

// import mongoose Schema
const Todo = require('../models/todo')

// setting route for home page
router.get('/', (req, res) => {
  Todo.find({})
    .sort({ name: 'asc' })
    .exec((err, todos) => {
      if (err) return console.error(err)
      return res.render('index', { todos: todos })
    })
})

module.exports = router