const express = require('express')

const { getTypes, getType, createType, updateType, deleteType } = require('../controllers/types')

const Types = require('../models/Types')

const advancedResults = require(`../middleware/advancedResults`)

//Include other resourse routers
const questionRouter = require('./questions')

//
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')

//Re-route into other resource routers
router.use('/:typesID/questions', questionRouter)

router.route('/').get(advancedResults(Types, 'quesstions'), getTypes).post(protect, authorize("publisher"), createType);
router.route('/:id').get(getType).delete(protect, authorize("publisher"), deleteType).put(protect, authorize("publisher"), updateType)

module.exports = router;