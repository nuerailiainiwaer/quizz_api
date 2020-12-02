const Type = require('../models/Types');
const ErrorResponse = require('../utiles/errorResponse')
const asyncHandler = require('../middleware/async');
const Feedback = require('../models/Feedback');




//@des Get all feedback
//@route Get /api/v1/feedback
//@access public
exports.getFeedbacks = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults)

})