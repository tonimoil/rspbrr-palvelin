const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Device = require('../models/device')

loginRouter.post('/', async (req, res) => {
    const body = req.body

    const device = await Device.findOne({ deviceID: body.deviceID })
    const passwordCorrect = device === null
    ? false
    : await bcrypt.compare(body.password, device.passwordHash)
    
    if(!(device && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid deviceID or password'
        })
    }

    const deviceForToken = {
        deviceID: device.deviceID,
        id: device._id,
    }
    const token = jwt.sign(deviceForToken, process.env.SECRET)

    res.status(200).send({ token, deviceID: device.deviceID})
})

module.exports = loginRouter
