const express =require('express')
const { isAsyncFunction } = require('util/types')
const router =express.Router()
const{registerUser,loginUser,home,applyBooking,unSeenToSeen,deleteAllNotifications,applicationStatus}=require('../controllers/UserController')
const {protect}=require('../middleware/authMiddleware')

router.post('/',registerUser)  
router.post('/login',loginUser)  
// router.post('/me',protect,getMe) 
router.post('/get-user-info-by-id',protect,home) 
router.post('/application', protect, applyBooking)
router.post('/applications',protect,applicationStatus)
router.post('/mark-all-notifications-as-seen',protect,unSeenToSeen)
router.post('/delete-all-notifications',protect,deleteAllNotifications)

module.exports=router