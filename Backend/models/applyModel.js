const mongoose = require('mongoose')
const { stringify } = require('querystring')
const applicationSchema = new mongoose.Schema(


    {

        name: {
            type: String,
            required: [true, 'please add a name']
        },
        city: {
            type: String,
            required: [true, 'please add a city']
        },
        email: {
            type: String,
            required: [true, 'please add a email']
        },
        companyName: {
            type: String,
            required: [true, 'please add a companyName']
        },
        address: {
            type: String,
            required: [true, 'please add a address']
        },
        state: {
            type: String,
            required: [true, 'please add a state']
        },
        phoneNumber: {
            type: String,
            required: [true, 'please add a phoneNumber']
        },
        companyLogo: {
            type: String,
            required: [true, 'please add a companyLogo']
        },
        // timings: {
        //     type: Array,
        //     required: [true, 'please add timings']
        // },
        status:{
            type:String,
            default:'pending'

        }, 
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }

    }
)
module.exports  = mongoose.model("Application", applicationSchema)
// module.exports = applicationModel