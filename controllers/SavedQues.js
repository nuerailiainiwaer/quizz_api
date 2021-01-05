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
    if (req.params.userID) {
        const savedQuesions = await SavedQues.find({
            userID: req.params.userID
        })
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
// @route POST /api/v1/questions
// @access private
exports.savedQuestions = asyncHandler(async(req, res, next) => {
    // req.body.userID = req.user._id;
    // req.body.quesID = req.params.quesID;

    const savedQues = await SavedQues.create(req.body)
    console.log(savedQues)
    res.status(200).json({
        success: 'meme',
        data: savedQues
    })
})

// @des get getTrueOrFlawseSavedQuestions
// @route get /api/v1/questions/:quesID/saved
// @access private
exports.getTrueOrFlawseSavedQuestions = asyncHandler(async(req, res, next) => {
    const savedQuesions = await SavedQues.find({
        userID: req.body.userID,
        quesID: req.body.quesID
    })

    res.status(200).json({
        success: true,
        data: savedQuesions
    })
})


// @des delete savedQuesation
// @route delete /api/v1/savedquestion/:id
// @access private
exports.deleteSavedQuestions = asyncHandler(async(req, res, next) => {


    const types = await SavedQues.findById(req.params.id);

    types.remove();
    res.status(200).json({ success: true })

});


// //@des Get all savedQuestions for a user
// //@route Get /:userID/question
// //@access public

// exports.getSavedQuestionsForAUser = asyncHandler(async(req, res, next) => {

//     const savedQuesions = await SavedQues.find({
//         userID: req.params.userID
//     })
//     console.log('anwar')


//     return res.status(200).json({
//         success: true,
//         count: savedQuesions.length,
//         data: savedQuesions
//     })



// })