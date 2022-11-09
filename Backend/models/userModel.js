
const mongoose =require('mongoose')
const { boolean } = require('webidl-conversions')

const userSchema =mongoose.Schema({
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
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    seenNotification:{
        type:Array,
        default:[]
    },
    unseenNotification:{
        type:Array,
        default:[]
    }

},
{
    timestamps:true
}
)

module.exports =mongoose.model('User',userSchema)