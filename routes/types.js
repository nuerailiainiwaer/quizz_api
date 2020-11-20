const express = require('express')

const { getTypes, getType, createType, updateType, deleteType } = require('../controllers/types')
const router = express.Router()

router.route('/').get(getTypes).post(createType);
router.route('/:id').get(getType).delete(deleteType).put(updateType)

module.exports = router;