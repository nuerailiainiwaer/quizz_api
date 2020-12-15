const Type = require('../models/Types');
const ErrorResponse = require('../utiles/errorResponse')
const asyncHandler = require('../middleware/async');
const Feedback = require('../models/Feedback');
const User = require('../models/User');
const SavedQues = require('../models/SavedQues')

//@des Get all saved questions
//@route Get /api/v1/savedquestion
//@access public
exports.getSavedQuestions = asyncHandler(async(req, res, next) => {
    const savedQuestions = await SavedQues.find();

    res.status(200).json({ success: true, count: savedQuestions.length, data: savedQuestions })
})
//@des Get all saved questions
//@route Get /api/v1/savedquestion
//@access public
exports.getSavedQuestions = asyncHandler(async(req, res, next) => {
    const savedQuestions = await SavedQues.find();

    res.status(200).json({ success: true, count: savedQuestions.length, data: savedQuestions })
})