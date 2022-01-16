const bcrypt = require('bcrypt')
const devicesRouter = require('express').Router()
const Device = require('../models/device')

devicesRouter.get('/', async (req, res) => {
    const devices = await Device
        .find({}).populate('temperatures')
    res.json(devices.map(d => d.toJSON()))
})

devicesRouter.post('/', async (req, res, next) => {
    const body = req.body

    if (body.apikey != process.env.API_KEY || !body.password) {

        return body.password ? res.status(401).json({ error: body.apikey ? 'apikey:n arvo virheellinen' : 'apikey muuttuja puuttuu' }) :  res.status(401).json({ error : 'password puuttuu'})
    }

    const saltRounds = 10

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const device = new Device({
        deviceID: body.deviceID,
        passwordHash,
    })

    const savedDevice = await device.save()
    res.json(savedDevice)
})

module.exports = devicesRouter
