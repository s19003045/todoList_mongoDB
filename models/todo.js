// import mongoose
const mongoose = require('mongoose')
// 使用 Mongoose Schema constructor 來建立實例
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

// 匯出一個名為 'Todo' 的 model，而這個 model 是 todoSchema 這個實例
module.exports = mongoose.model('Todo', todoSchema)