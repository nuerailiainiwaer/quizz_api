const mongoose = require('mongoose');
const slugify = require('slugify')
const QuestionDoneSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Types',
        required: true
    },
    quesID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Types',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now

    }

})


module.exports = mongoose.model('Questionsdone', QuestionDoneSchema);