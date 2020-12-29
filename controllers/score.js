const Score = require('../models/Score');

const ErrorResponse = require('../utiles/errorResponse')
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

//@des Get all Score
//@route Get /api/v1/score
//@access public
exports.getScores = asyncHandler(async(req, res, next) => {
    if (req.params.id) {
        console.log(req.params.id)
        const scores = await Score.find({
            user: req.params.id
        })
        console.log(scores)
        console.log('anwar')


        return res.status(200).json({
            success: true,
            count: scores.length,
            data: scores
        })
    } else {
        //by adding populate('type') we populate  alllll the type
        // sometimes we do not need to add all of types so lets see below
        // query = Question.find().populate({
        //     path: "type",
        //     select: "name"
        // });
        const savedQuestions = await Score.find();

        res.status(200).json({ success: true, count: savedQuestions.length, data: savedQuestions })

    }
    // res.status(200).json(res.advancedResults)

});

//@des Get single score
//@route Get /api/v1/score/:id
//@access private
// exports.getScore = asyncHandler(async(req, res, next) => {
//     if (req.params.id) {
//         const scores = await Score.find({
//             userID: req.params.id
//         })
//         console.log('anwar')


//         return res.status(200).json({
//             success: true,
//             count: scores.length,
//             data: scores
//         })
//     }

//     const score = await Score.findById(req.params.id);
//     //Correccctly formated but does not exist
//     if (!score) {
//         return next(new ErrorResponse(`Score is not found with id of ${req.params.id} `, 404));
//     }
//     res.status(200).json({ success: true, data: score })

// });

//@des create new score
//@route POST /api/v1/score/:id
//@access private

exports.createScore = asyncHandler(async(req, res, next) => {
    console.log(req.user)
    req.body.user = req.user._id;
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorResponse(`No user with the id of ${req.params.id}`), 404)
    }
    const userCreate = await Score.create(req.body)
    res.status(200).json({
        success: true,
        data: userCreate
    })
});


//@des delete score
//@route delete /api/v1/score/:id
//@access private

exports.deleteScore = asyncHandler(async(req, res, next) => {
    const savedQues = await Score.findById(req.params.idme);
    console.log(savedQues)
    console.log(req.user)
    if (req.user._id = savedQues.user) {
        savedQues.remove();


    }
    // req.body.user = req.user._id;
    // const user = await User.findById(req.params.id)
    // if (!user) {
    //     return next(new ErrorResponse(`No user with the id of ${req.params.id}`), 404)
    // }
    // const userCreate = await Score.create(req.body)
    res.status(200).json({
        success: true,
        data: {}
    })
});