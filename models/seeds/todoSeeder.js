const mongoose = require('mongoose')
const Todo = require('../todo')

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })

// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('connect to mongoDB error')
})

db.once('open', () => {
  console.log('conncet to mongoDB successifully!')

  for (i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('All things done!')
})

