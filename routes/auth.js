const express = require('express')
const { register, login, getMe, forgotPassword, resetPassword, updateDetails, updatePassword, makingauthtrue } = require('../controllers/auth');
const router = express.Router();
const { protect } = require('../middleware/auth')

const feedbackRouter = require('./feedback')
const scoreRouter = require('./score')

router.use('/:authID/feedback', feedbackRouter)
router.use('/:authID/score', scoreRouter)

router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.put('/updatedetails', protect, updateDetails)
router.put('/makingauthtrue', protect, makingauthtrue)
router.put('/updatepassword', protect, updatePassword)
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword)
module.exports = router;