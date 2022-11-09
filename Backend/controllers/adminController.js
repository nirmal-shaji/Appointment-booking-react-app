const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const User = require('../models/userModel')
const Application = require('../models/applyModel')
const Slot = require('../models/slotModel')
const mongoose = require('mongoose')
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //check admin email
    const admin = await Admin.findOne({ email })
    if (admin && (await bcryptjs.compare(password, admin.password))) {
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid credentials')
    }
    // res.json({ message: 'login Admin' })
})



const getUserList = asyncHandler(async (req, res) => {
   
    const userList = await User.find({ isAdmin: false })

    res.status(200).json({
        success: true,
        message: "userList",
        data: userList
    })
})





const getNewApplications = asyncHandler(async (req, res) => {

    const newAppicationList = await Application.find({ status: "pending" })
  
    res.status(200).json({
        success: true,
        message: "newAppicationList",
        data: newAppicationList
    })
}
)


const getApprovedApplications = asyncHandler(async (req, res) => {
    // let obj = new Slot({

    // })
    // await obj.create()
   
    const ApprovedApplications = await Application.find({ status: "approved" })
  
    res.status(200).json({
        success: true,
        message: "newAppicationList",
        data: ApprovedApplications
    })
}
)

const approveApplication = asyncHandler(async (req, res) => {


   
    try {
        const { applicationId, userIid, status } = req.body
      
        const application = await Application.findByIdAndUpdate(applicationId, { status })
       
        res.status(200).send({
            message: "application approved successfully",
            success: true,
            data: application
        })
        const user = await User.findOne({ _id: userIid })
        const unseenNotification = user.unseenNotification
        unseenNotification.push({

            type: "application request changed",
            message: `your application has been ${status}`,
            onclickPath: "/notifications"
        })
        await User.findByIdAndUpdate(user._id, { unseenNotification })
        // const applications=await application.find({})
        res.status(200).send({
            message: "application approved successfully",
            success: true,
            data: application
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "application denied",
            success: true,
            data: application
        })
    }
}
)

const getSlotData = asyncHandler(async (req, res) => {
    try {


        const getAllSlots = await Slot.find({})
      
        res.json({ success: true, getAllSlots })
    } catch (error) {

    }
}

)



const slotconfirm = asyncHandler(async (req, res) => {

    try {
        
        const { appId, userIid, slotId } = req.body
     
        await Slot.findOneAndUpdate({ _id: slotId }, { ApplicationId: appId, userId: userIid, status: true })
        await Application.findOneAndUpdate({ _id: appId }, { status: "Booked" })
        res.json({ success: true })
    } catch (error) {
        console.log(error, "errorerror");
    }
}

)

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}


module.exports = {
    loginAdmin, getSlotData, getUserList, getNewApplications, approveApplication, getApprovedApplications, slotconfirm
}