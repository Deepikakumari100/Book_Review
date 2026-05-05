const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        immutable: true   
    },
    author: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    review: String,
    reviewDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('reviews', bookSchema);