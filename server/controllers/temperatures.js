const { json } = require('express/lib/response')
const jwt = require('jsonwebtoken')
const tempRouter = require('express').Router()
const Device = require('../models/device')
const Temperature = require('../models/temperature')

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
}

tempRouter.get('/latestbyid', async (req, res) => {
    const deviceAndLatestTemp = await Device.find({}).populate({path:'temperatures', options: { sort: { 'date': -1 } }, perDocumentLimit: 1})
    const inJson = deviceAndLatestTemp.map(d =>
        ({  
            deviceID : d.deviceID,
            temp : d.temperatures[0] ? d.temperatures[0].temperature : null,
            date : d.temperatures[0] ? d.temperatures[0].date : null
        }))
    
    res.json(inJson)
})

tempRouter.post('/', async (req, res) => {
    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if(!token || !decodedToken.id) {
        return res.status(401).json({ error : 'token missing or invalid' })
    }
    const device = await Device.findById(decodedToken.id)

    const temp = new Temperature({
        temperature: body.temp,
        date: new Date(),
        device: device._id
    })
    const savedTemp = await temp.save()
    device.temperatures = device.temperatures.concat(savedTemp._id)
    await device.save({ validateModifiedOnly : true })

    res.json(savedTemp.toJSON())
})

module.exports = tempRouter
