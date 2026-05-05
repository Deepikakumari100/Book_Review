const express = require('express')
const router = express.Router()
const review = require('../models/review')

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next()
    res.redirect('/login')
}

router.get('/reviews',isLoggedIn,async(req,res)=>{
    const reviews = await Review.find({})
    res.render('reviews/index',{reviews})
})

router.get('/review/new',isLoggedIn,(req,res)=>{
    res.render('reviews/new')
})

router.post('/review',isLoggedIn,async(req,res)=>{
    await Review.create(req.body)
    res.redirect('/reviews')
})

router.get('/reviews/:id',isLoggedIn,async(req,res)=>{
    const review = await Review.findById(req.params.id)
    res.render('reviews/show',{review})
})

router.get('/reviews/:id/edit',isLoggedIn,async(req,res)=>{
    const review = await Review.findById(req.params.id)
    res.render('reviews/edit',{review})
})

router.put('/reviews/:id',isLoggedIn,async(req,res)=>{
    delete req.body.title
    await Review.findByIdAndUpdate(req.params.id,req.body)
    res.redirect(`/reviews/${req.params.id}`)
})

router.delete('/reviews/:id',isLoggedIn,async(req,res)=>{
    await Review.findByIdAndDelete(req.params.id)
    res.redirect('/reviews')
})

module.exports = router