const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose').default || require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    favoriteGenre:String,
    bio:String,
    reviewSince:{
        type:Date,
        default:Date.now    
    }
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User',userSchema)