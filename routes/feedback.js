const express = require('express')

const { getFeedbacks } = require('../controllers/feedback')
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({
    mergeParams: true
});
const { protect, authorize } = require('../middleware/auth')

const Feedback = require('../models/Feedback')

router.route('/').get(advancedResults(Feedback, {
    path: "user",
    select: "email"
}), getFeedbacks)
module.exports = router;