const express = require('express')

const { getTypes, getType, createType, updateType, deleteType } = require('../controllers/types')
    //Include other resourse routers
const questionRouter = require('./questions')

//
const router = express.Router()

//Re-route into other resource routers
router.use('/:typesID/questions', questionRouter)

router.route('/').get(getTypes).post(createType);
router.route('/:id').get(getType).delete(deleteType).put(updateType)

module.exports = router;