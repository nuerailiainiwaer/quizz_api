const ErrorResponse = require('../utiles/errorResponse')
const asyncHandler = require('../middleware/async');
const Question = require('../models/Questions');
const { query } = require('express');

//@des Get Question
//@route Get /api/v1/questions
//@route Get /api/v1/types/:typesID/questions
//@access public

exports.getQuestions = asyncHandler(async(req, res, next) => {
    let query


    if (req.params.typesID) {
        console.log('man')
        query = Question.find({
            type: req.params.typesID
        })
    } else {
        //by adding populate('type') we populate  alllll the type
        // sometimes we do not need to add all of types so lets see below
        query = Question.find().populate({
            path: "type",
            select: "name"
        });

    }
    const courses = await query;
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })

})