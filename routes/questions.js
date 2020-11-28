const express = require('express')

const { getQuestions, getQuestion, addQuestion, updateQuestion, deleteQuestion, uploadPhotoToQuestions } = require('../controllers/questions')

const router = express.Router({
    mergeParams: true
});
router.route('/').get(getQuestions).post(addQuestion);
router.route('/:id').get(getQuestion).put(updateQuestion).delete(deleteQuestion);
router.route('/:id/photo').put(uploadPhotoToQuestions)
module.exports = router;