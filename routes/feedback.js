const express = require('express')

const { getFeedbacks, getFeedback, createfeedback, updateFeedback, deleteFeedback } = require('../controllers/feedback')
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({
    mergeParams: true
});
const { protect, authorize } = require('../middleware/auth')

const Feedback = require('../models/Feedback')

router.route('/').get(advancedResults(Feedback, {
    path: "user",
    select: "email"
}), getFeedbacks).post(protect, authorize("user"), createfeedback);
router.route('/:id').get(getFeedback).put(protect, authorize("user"), updateFeedback).delete(protect, authorize("user"), deleteFeedback)
module.exports = router;