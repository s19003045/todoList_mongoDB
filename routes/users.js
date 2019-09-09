const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/users')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

// // login submit
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/users/login'
//   })(req.res.next)
// })

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { // 使用 passport 認證
    successRedirect: '/', // 登入成功會回到根目錄
    failureRedirect: '/users/login' // 失敗會留在登入頁面
  })(req, res, next)
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
  req.logout()
  res.redirect('/users/login')
})

module.exports = router