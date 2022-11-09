const express =require('express')
const router =express.Router()
const{loginAdmin,getUserList,getNewApplications,approveApplication,getApprovedApplications,getSlotData,slotconfirm}=require('../controllers/adminController')

const {protect}=require('../middleware/authMiddleware')

router.post('/login',loginAdmin)
router.get('/get-all-users',protect,getUserList)
router.get('/get-new-applications',protect,getNewApplications)
router.get('/get-approved-applications',protect,getApprovedApplications)


router.post('/applications-status-changing',protect,approveApplication)
router.get('/get-slot-data',protect,getSlotData)
router.post('/slotconfirm',protect,slotconfirm)

module.exports=router
