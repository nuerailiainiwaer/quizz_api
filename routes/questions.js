const express = require('express')

const { getQuestions, getQuestion, addQuestion, updateQuestion, deleteQuestion, uploadPhotoToQuestions, saveQuestion, getSavedQuestion } = require('../controllers/questions')
const Questions = require('../models/Questions')
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({
    mergeParams: true
});
const { protect, authorize } = require('../middleware/auth')

const savedQuesRouter = require('./savedQues')
router.use('/:quesID/saved', savedQuesRouter)


router.route('/').get(advancedResults(Questions, {
    path: "type",
    select: "name"
}), getQuestions).post(protect, authorize("publisher"), addQuestion);
router.route('/:id').get(getQuestion).put(protect, authorize("publisher"), updateQuestion).delete(protect, authorize("publisher"), deleteQuestion);
router.route('/:id/photo').put(uploadPhotoToQuestions)
router.route('/save/:id').put(protect, authorize("user"), saveQuestion)
router.route('/get/:id').get(protect, authorize("user"), getSavedQuestion)
module.exports = router;