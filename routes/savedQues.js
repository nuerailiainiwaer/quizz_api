const express = require('express')
const { getSavedQuestions, savedQuestions, deleteSavedQuestions } = require('../controllers/SavedQues')
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({
    mergeParams: true
});
const { protect, authorize } = require('../middleware/auth')
router.route('/').get(getSavedQuestions).post(protect, authorize("user"), savedQuestions)
router.route('/:id').delete(protect, authorize("user"), deleteSavedQuestions)

module.exports = router;