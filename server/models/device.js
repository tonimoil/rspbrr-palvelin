const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const deviceSchema = mongoose.Schema({
    deviceID: {
        type: Number,
        min: 1,
        max: 99999,
        unique: true,
        required: true,
        validate : {
            validator : Number.isInteger,
            message : '{VALUE} is not an integer value'
        }
    },
    passwordHash: {
        type: String,
        required: true
    },
    temperatures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Temperature'
        }
    ],
})

deviceSchema.plugin(uniqueValidator)

deviceSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const Device = mongoose.model('Device', deviceSchema)

module.exports = Device
