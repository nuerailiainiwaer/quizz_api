const express = require('express')
const { getSavedQuestions } = require('../controllers/SavedQues')
const advancedResults = require('../middleware/advancedResults')
const router = express.Router({
    mergeParams: true
});
const { protect, authorize } = require('../middleware/auth')
router.route('/').get(getSavedQuestions)
module.exports = router;