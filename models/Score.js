const mongoose = require('mongoose');
const slugify = require('slugify')
const TypecampScheme = new mongoose.Schema({
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