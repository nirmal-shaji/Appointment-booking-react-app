const { timeStamp } = require('console')
const mongoose =require('mongoose')

const adminSchema =mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name']
    },
    email:{
        type:String,
        required:[true,'please add a email']
    },
    password:{
        type:String,
        required:[true,'please add a password']
    } 
},
{
    timestamps:true
}
)

module.exports =mongoose.model('Admin',adminSchema)