const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',async(req,res)=>{
    const {username,password,favoriteAuthor} = req.body
    const user = new User({username,favoriteAuthor})
    await User.register(user,password)
    res.redirect('/login')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',
    passport.authenticate('local',{
        successRedirect:'/reviews',
        failureRedirect:'/login'
    })
)

router.get('/logout',(req,res)=>{
    req.logout(()=>{
        res.redirect('/login')
    })
})

module.exports = router