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
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  }
})

tempSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.device
    delete returnedObject.id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//module.exports = mongoose.model('Temperature', tempSchema)
const Temperature = mongoose.model('Temperature', tempSchema)

module.exports = Temperature
