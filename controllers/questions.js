const ErrorResponse = require('../utiles/errorResponse')
const asyncHandler = require('../middleware/async');
const Question = require('../models/Questions');
const { query } = require('express');
const Types = require('../models/Types');
const { findByIdAndDelete } = require('../models/Types');
const path = require('path');

//@des Get all Questions
//@route Get /api/v1/questions
//@route Get /api/v1/types/:typesID/questions
//@access public

exports.getQuestions = asyncHandler(async(req, res, next) => {
    if (req.params.typesID) {
        const quesions = await Question.find({
            type: req.params.typesID
        })

        return res.status(200).json({
            success: true,
            count: quesions.length,
            data: quesions
        })
    } else {
        //by adding populate('type') we populate  alllll the type
        // sometimes we do not need to add all of types so lets see below
        // query = Question.find().populate({
        //     path: "type",
        //     select: "name"
        // });
        res.status(200).json(res.advancedResults)

    }
    // const courses = await query;
    // res.status(200).json({
    //     success: true,
    //     count: courses.length,
    //     data: courses
    // })

})



//@des Get single Question
//@route Get /api/v1/questions/:id
//@access public

exports.getQuestion = asyncHandler(async(req, res, next) => {
    const course = await Question.findById(req.params.id).populate({
        path: "type",
        select: "name"

    })
    if (!course) {
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404)
    }
    res.status(200).json({
        success: true,
        count: course.length,
        data: course
    })

})



//@des Add a course
/// the questions added associated with type
//@route POST /api/v1/types/:typesID/questions
//@access private

exports.addQuestion = asyncHandler(async(req, res, next) => {
    req.body.type = req.params.typesID;
    const types = await Types.findById(req.params.typesID)
    if (!types) {
        return next(new ErrorResponse(`No types with the id of ${req.params.typesID}`), 404)
    }
    const question = await Question.create(req.body)
    res.status(200).json({
        success: true,
        data: question
    })

})


//@des Update a course
//@route PUT /api/v1/questions/:id
//@access private

exports.updateQuestion = asyncHandler(async(req, res, next) => {
    let question = await Question.findById(req.params.id)
    if (!question) {
        return next(new ErrorResponse(`No question with the id of ${req.params.id}`), 404)
    }
    question = await Question.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true

    })
    res.status(200).json({
        success: true,
        data: question
    })

})


//@des Delete a course
//@route Delete/api/v1/questions/:id
//@access private

exports.deleteQuestion = asyncHandler(async(req, res, next) => {
    const question = await Question.findById(req.params.id)
    if (!question) {
        return next(new ErrorResponse(`No question with the id of ${req.params.id}`), 404)
    }
    await question.remove();
    res.status(200).json({
        success: true
    })

})

//@des save a question
//@route post/api/v1/questions/save/:id
//@access private

exports.saveQuestion = asyncHandler(async(req, res, next) => {
        // const question = await Question.findById(req.params.id)
        // var id = req.user._id;
        // var bolen = question.saved.includes(id)
        // if (bolen) {
        //     return next(new ErrorResponse(`The questions is already saved`), 404)
        // }


        const fieldsToUpdate = {
            saved: req.body.saved
        };
        const questionme = await Question.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
            new: true,
            runValidators: true,
        });
        console.log(questionme)

        res.status(200).json({
            success: true,
            data: questionme
        })

    })
    //@des get a saved question
    //@route get /api/v1/questions/get/:id
    //@access private

exports.getSavedQuestion = asyncHandler(async(req, res, next) => {
    const question = await Question.findById(req.params.id)
    var id = req.user._id;
    var bolen = question.saved.includes(id)

    res.status(200).json({
        success: true,
        data: bolen

    })


})


//@des upload photo for questions
//@route put /api/v1/questions/:id/photo
//@access privatec

exports.uploadPhotoToQuestions = asyncHandler(async(req, res, next) => {
    const question = await Question.findById(req.params.id)
    if (!question) {
        return next(new ErrorResponse(`No question with the id of ${req.params.id}`), 404)
    }

    if (!req.files) {
        return next(new ErrorResponse(`Please Upload a file`, 400))
    }
    const file1 = req.files.file;
    console.log(file1)

    //make sure that the img is photo

    if (!file1.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image`, 400))
    }
    //Check file size
    if (file1.size > process.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload an less than ${process.env.MAX_FILE_UPLOAD} `, 400))

    }
    //create custom file name//
    //
    file1.name = `photo_${question._id}${path.parse(file1.name).ext}`;
    file1.mv(`${process.env.FILE_UPLOAD_PATH}/${file1.name}`, async err => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse(`Problem with file upload`, 500))
        }

        await Question.findByIdAndUpdate(req.params.id, {
            photo: file1.name
        });
        res.status(200).json({
            success: true,
            data: file1.name
        })



    });







})