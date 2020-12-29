const express = require('express')
const { getScores, createScore, deleteScore } = require('../controllers/score')
const advancedResults = require(`../middleware/advancedResults`)
const router = express.Router()
const { protect, authorize } = require('../middleware/auth')
const Score = require('../models/Score')

router.route('/').get(getScores);
router.route('/:id').get(protect, authorize("user"), getScores).post(protect, authorize("user"), createScore)
router.route('/:idme/delete').delete(protect, authorize("user"), deleteScore)

module.exports = router;