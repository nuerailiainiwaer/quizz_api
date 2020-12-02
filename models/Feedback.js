const mongoose = require('mongoose');
const slugify = require('slugify')
const FeedbackScheme = new mongoose.Schema({
    feedBack: {
        type: String,
        required: [true, 'Please add a feedback'],
        maxlength: [50, 'Name can not be more than 50 characters']
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
module.exports = mongoose.model('Feedback', FeedbackScheme)