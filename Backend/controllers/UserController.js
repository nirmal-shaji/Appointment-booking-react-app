const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Application = require('../models/applyModel')

//desc regisr nw user
//rout post /user
//access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    //check existing user exist
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('userExist')
    }
    //hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)
    //create user
    const user = await User.create({
        name,
        email,
        password: hashedpassword

    })
    if (user) {
        let message = 'User Created Successfully'
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            success: true,
            message
        })
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})


//desc loin  user
//rout get /user
//access public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    //check of user email
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        let message = 'User Login successfull'
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,

            token: generateToken(user._id),
            success: true,
            message
        })
    } else {
        res.status(400)
        throw new Error('invalid credentials')
    }

    // res.json({ message: 'login User' })
})

//desc user  data
//rout get /user/me
//access private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json({
        _id: _id,
        name,
        email
    })
})

const home = asyncHandler(async (req, res) => {
   
    const user = await User.findById(req.user.id)
  
    if (!user) {
        res.status(200).send({ message: "user doesnt exist", success: false })
    } else {
        res.status(200).send({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                seenNotification: user.seenNotification,
                unseenNotification: user.unseenNotification,
                isAdmin: user.isAdmin

            }
        })

    }
})
const applyBooking = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const userName=req.user.name
 
    req.body.userId = userId
    const applyDetails = req.body
    const application = await Application.findOne({ userId: req.body.userId })
    if (application) {
        res.status(400)
        throw new Error('already applied')
    } else {
        const newApplication = new Application(applyDetails)
        await newApplication.save()
      
        const userAdmin = await User.findOne({ isAdmin: true })
        const unseenNotification = userAdmin.unseenNotification
        unseenNotification.push({
            type:"new-application",
            message:`${userName} has applied`,
            data:{
                userId:userId,
                name:userName,
               
            },
            onclickPath:"/Applications"
        })
        await User.findByIdAndUpdate(userAdmin._id,{unseenNotification})
        return res.status(201).send({
            success: true,
            message: "Application successfully applied"
        })
    }
}

)

const unSeenToSeen=asyncHandler(async (req,res)=>{
    
   
    const user = await User.findById(req.user._id)
   
    user.seenNotification=await user.unseenNotification

    user.unseenNotification=[]
    // const updatedUser=await User.findByIdAndUpdate(user._id,user)
     const updatedUser=await user.save()
     updatedUser.password=undefined
  
     res.status(200).send({
        success:true,
        message:"All notification marked as seen",
        data:updatedUser
     })

}
)

const deleteAllNotifications=asyncHandler(async(req,res)=>{
   
    const user = await User.findById(req.user._id)
    
    user.seenNotification=[]
    user.unseenNotification=[]
    // const updatedUser=await User.findByIdAndUpdate(user._id,user)
    const updatedUser=await user.save()

    updatedUser.password=undefined
    res.status(200).send({
        success:true,
        message:"All notifications deleted",
        data:updatedUser
     })
}

)

const applicationStatus = asyncHandler(async(req, res) => {
    console.log("this is reaching here");
})


//generate jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}



module.exports = {
    registerUser, loginUser, getMe, home, applyBooking,unSeenToSeen,deleteAllNotifications,applicationStatus
}