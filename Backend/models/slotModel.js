
const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

const slotSchema = mongoose.Schema({
    name: {
        type: String,

    },
    ApplicationId: {
        type: mongoose.Types.ObjectId,
    },
    userId: {
        type: mongoose.Types.ObjectId,

    },
    status: {
        type: Boolean,
        default: false
    },

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Slot', slotSchema)