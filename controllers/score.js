const Score = require('../models/Score');

const ErrorResponse = require('../utiles/errorResponse')
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

//@des Get all Score
//@route Get /api/v1/score
//@access public
exports.getScores = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults)

});

//@des Get single score
//@route Get /api/v1/score/:id
//@access private
exports.getScore = asyncHandler(async(req, res, next) => {

    const score = await Score.findById(req.params.id);
    //Correccctly formated but does not exist
    if (!score) {
        return next(new ErrorResponse(`Score is not found with id of ${req.params.id} `, 404));
    }
    res.status(200).json({ success: true, data: score })

});

//@des create new score
//@route POST /api/v1/auth/:authID/feedback
//@access private

exports.createScore = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.authID)
    if (!user) {
        return next(new ErrorResponse(`No user with the id of ${req.params.authID}`), 404)
    }
    const userCreate = await Score.create(req.body)
    res.status(200).json({
        success: true,
        data: userCreate
    })
});