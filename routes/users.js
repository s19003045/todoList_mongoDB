const express = require('express')
const router = express.Router()

const User = require('../models/users')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

// login submit
router.post('/login', (req, res) => {
  res.send('login submit')
})

// register
router.get('/register', (req, res) => {
  res.render('register')
})

// register submit
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body

  User.findOne({ email: email }).then(user => {
    if (user) {
      console.log('User already exists')
      res.render('register', {
        name, email, password, password2
      })
    } else {
      const user = new User({ name: name, email: email, password })
      user.save()
        .then(user => {
          res.redirect('/')
        })
        .catch(err => console.log(err))
    }
  })
  // res.send('register submit')

})

// log out
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router