const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const tempSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    min: -50,
    max: 100,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  deviceId: {
    type: Number,
    min: 1,
    max: 99999,
    required: true
  }
})

tempSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Temperature', tempSchema)
