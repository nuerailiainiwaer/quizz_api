const express = require('express')
const { getScores, getScore } = require('../controllers/score')
const advancedResults = require(`../middleware/advancedResults`)
const router = express.Router()
const { protect, authorize } = require('../middleware/auth')
const Score = require('../models/Score')

router.route('/').get(advancedResults(Score, {
    path: "user",
    select: "email"
}), getScores).post(protect, authorize("user"), getScores);
router.route('/:id').get(getScore)

module.exports = router;