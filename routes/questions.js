const express = require('express')

const { getQuestions, getQuestion, addQuestion, updateQuestion, deleteQuestion, uploadPhotoToQuestions } = require('../controllers/questions')
const Questions = require('../models/Questions')
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({
    mergeParams: true
});
const { protect, authorize } = require('../middleware/auth')
router.route('/').get(advancedResults(Questions, {
    path: "type",
    select: "name"
}), getQuestions).post(protect, authorize("publisher"), addQuestion);
router.route('/:id').get(getQuestion).put(protect, authorize("publisher"), updateQuestion).delete(protect, authorize("publisher"), deleteQuestion);
router.route('/:id/photo').put(protect, authorize("publisher"), uploadPhotoToQuestions)
module.exports = router;