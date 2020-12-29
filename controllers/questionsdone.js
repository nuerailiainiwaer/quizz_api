const Type = require('../models/Types');
const ErrorResponse = require('../utiles/errorResponse')
const asyncHandler = require('../middleware/async');
const Feedback = require('../models/Feedback');
const User = require('../models/User');
const SavedQues = require('../models/SavedQues')
const QuestionDone = require('../models/Questionsdone')


//@des Get all done question
//@route Get /api/v1/donequestion
//@access public
exports.getDoneQuestions = asyncHandler(async(req, res, next) => {
    if (req.params.userID) {
        const savedQuesions = await QuestionDone.find({
            userID: req.params.userID
        })
        console.log('anwar')


        return res.status(200).json({
            success: true,
            count: savedQuesions.length,
            data: savedQuesions
        })
    } else {
        //by adding populate('type') we populate  alllll the type
        // sometimes we do not need to add all of types so lets see below
        // query = Question.find().populate({
        //     path: "type",
        //     select: "name"
        // });
        const savedQuestions = await SavedQues.find();

        res.status(200).json({ success: true, count: savedQuestions.length, data: savedQuestions })

    }
    // const courses = await query;
    // res.status(200).json({
    //     success: true,
    //     count: courses.length,
    //     data: courses
    // })



})


// @des create savedQuesation
// @route POST /api/v1/questions/:quesID/saved
// @access private
exports.savedDoneQuestions = asyncHandler(async(req, res, next) => {
    req.body.userID = req.user._id;
    req.body.quesID = req.params.quesID;

    const savedQues = await SavedQues.create(req.body)
    console.log(savedQues)
    res.status(200).json({
        success: true,
        data: savedQues
    })
})

// @des delete savedQuesation
// @route delete /api/v1/savedquestion/:id
// @access private
exports.deleteSavedQuestions = asyncHandler(async(req, res, next) => {
    const savedQues = await SavedQues.findById(req.params.id);
    if (!savedQues) {
        return next(new ErrorResponse(`Saved Question is not found with id of ${req.params.id} `, 404));
    }
    if (JSON.stringify(savedQues.userID) !== JSON.stringify(req.user._id)) {
        return next(new ErrorResponse(` ${req.user._id} is not saver of the question `, 404));

    }
    savedQues.remove();
    res.status(200).json({ success: true, data: {} })

});