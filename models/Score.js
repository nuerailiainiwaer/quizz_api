const mongoose = require('mongoose');
const slugify = require('slugify')
const ScoreScheme = new mongoose.Schema({
    Score: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})


module.exports = mongoose.model('Score', ScoreScheme)