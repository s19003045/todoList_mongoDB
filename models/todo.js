// import mongoose
const mongoose = require('mongoose')
// 使用 Mongoose Schema constructor 來建立實例
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',  //關聯 users collection
    index: true,
    required: true
  }
})

// 匯出一個名為 'Todo' 的 model，而這個 model 是透過 mongoose.model 把 todoSchema這個實例 轉成 model，於是此 model 之後就可以被使用
module.exports = mongoose.model('Todo', todoSchema)

