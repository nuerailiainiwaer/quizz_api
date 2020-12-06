const Type = require('../models/Types');
const ErrorResponse = require('../utiles/errorResponse')
const asyncHandler = require('../middleware/async');
const Feedback = require('../models/Feedback');
const User = require('../models/User');




//@des Get all feedback
//@route Get /api/v1/feedback
//@access public
exports.getFeedbacks = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults)

})

//@des Get single feedback
//@route Get /api/v1/feedback/:id
//@access private
exports.getFeedback = asyncHandler(async(req, res, next) => {

    const feedback = await Feedback.findById(req.params.id);
    //Correccctly formated but does not exist
    if (!feedback) {
        return next(new ErrorResponse(`feedback is not found with id of ${req.params.id} `, 404));
    }
    res.status(200).json({ success: true, data: feedback })

});

//@des create new feedback
//@route POST /api/v1/auth/:authID/feedback
//@access private

exports.createfeedback = asyncHandler(async(req, res, next) => {
    req.body.user = req.params.authID;
    const user = await User.findById(req.params.authID)
    if (!user) {
        return next(new ErrorResponse(`No user with the id of ${req.params.authID}`), 404)
    }

    req.body.user = req.user.id;
    //Check fro publicsed feedback
    const publisedfeedback = await Feedback.findOne({ user: req.user.id })
        // if the user is not publiser they can only add one feedback
    if (publisedfeedback && req.user.role !== "publisher") {
        return next(new ErrorResponse(`The user with ID ${req.user.id} has already publisesed a feedback`, 400))

    }
    const feedback = await Feedback.create(req.body)
    res.status(200).json({
        success: true,
        data: feedback
    })




    // req.body.user = req.user.id;
    // //Check fro publicsed feedback
    // const publisedfeedback = await Feedback.findOne({ user: req.user.id })
    //     // if the user is not publiser they can only add one feedback
    // if (publisedfeedback && req.user.role !== "publisher") {
    //     return next(new ErrorResponse(`The user with ID ${req.user.id} has already publisesed a feedback`, 400))

    // }
    // const feedback = await Feedback.create(req.body);
    // res.status(201).json({
    //     success: true,
    //     data: feedback
    // })
});

//@des update feedback
//@route PUT /api/v1/feedback/:id
//@access private
exports.updateFeedback = asyncHandler(async(req, res, next) => {
    let types = await Feedback.findById(req.params.id);
    if (!types) {
        return next(new ErrorResponse(`Feedback is not found with id of ${req.params.id} `, 404));
    }
    // make user user is feedback publisher//we gonna turn string id to string 
    if (types.user.toString() !== req.user.id && req.user.role !== 'publiser') {
        return next(new ErrorResponse(`User ${req.params.id} is not authoried to update this feedback `, 401));

    }
    types = await Feedback.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ success: true, data: types })

});

//@des delete feedback
//@route delete /api/v1/feedback/:id
//@access private
exports.deleteFeedback = asyncHandler(async(req, res, next) => {
    const types = await Feedback.findById(req.params.id);
    if (!types) {
        return next(new ErrorResponse(`Feedback is not found with id of ${req.params.id} `, 404));
    }
    if (types.user.toString() !== req.user.id && req.user.role !== 'publiser') {
        return next(new ErrorResponse(`User ${req.params.id} is not authoried to delete this feedback `, 401));

    }
    types.remove();
    res.status(200).json({ success: true, data: {} })

});