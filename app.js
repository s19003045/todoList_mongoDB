const express = require('express')
const app = express()
const port = 3000


// 
app.get('/', (req, res) => {
  res.send('hello world. Who are you?')
})


// server listen
app.listen(port, () => {
  console.log(`Express server listen to http://localhost:${port}`)
})