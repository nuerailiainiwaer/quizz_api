const monngoose = require('mongoose');
const QuestionSchema = new monngoose.Schema({
    ques: {
        type: String,
        required: [true, 'Please add a question title']
    },
    A: {
        type: String,
        required: [true, 'Please add answer quesA']
    },
    B: {
        type: String,
        required: [true, 'Please add answer quesB']
    },
    C: {
        type: String,
        required: [true, 'Please add answer quesC']
    },
    D: {
        type: String,
        required: [true, 'Please add answer quesD']
    },
    anS: {
        type: String,
        required: [true, 'Please add answer to question!'],
        enum: ["A", "B", "C", "D"]
    },
    saved: {
        type: Array
    },
    ranking: {
        type: Number,
        default: 1

    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now

    },

    type: {
        type: monngoose.Schema.ObjectId,
        ref: 'Types',
        required: true
    }
})

module.exports = monngoose.model('Questions', QuestionSchema)