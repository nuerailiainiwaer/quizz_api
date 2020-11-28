const express = require('express')

const { getQuestions } = require('../controllers/questions')

const router = express.Router({
    mergeParams: true
});
router.route('/').get(getQuestions);
module.exports = router;