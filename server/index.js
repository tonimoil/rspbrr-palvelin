require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const Temperature = require('./models/temperature')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../client/build')));

/*                     */
/*  Sovelluksen polut  */
/*                     */

/* Kaikkien haku */
app.get('/api/temperatures', (req, res) => {
    Temperature.find({}).then(temps => {
        res.json(temps)
    })
})

app.get('/api/latestbyid', (req, res) => {
    Temperature.aggregate([
        {
            $sort: { deviceId: 1, date: 1}
        },
        {
            $group: {
                    "_id": "$deviceId",
                    "latest": {$last:"$date"},
                    last:{$last:"$$ROOT"}
            }
        },
        {
            $addFields: {
                temperature : "$last.temperature"
            }
        },
        {
            $unset:"last"
        }
    ]).then(temps => {
        res.json(temps)
    })
})

/* Post polku lämpötilalle, palvelin tallentaa ajan */
app.post('/api/posttemperature', (request, response) => {
    const body = request.body

    if (isNaN(parseFloat(body.temp)) || isNaN(parseInt(body.deviceId)) || body.apikey != process.env.API_KEY ) {
      return response.status(400).json({ error: 'error' })
    }

    const temp = new Temperature({
      temperature: body.temp,
      date: new Date(),
      deviceId: body.deviceId,
    })

    temp.save().then(savedTemp => {
      response.json(savedTemp)
    })
})

/* Palautetaan defaulttina reactin luoma sivu */
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

/* Lopuksi asetetaan sovellus kuuntelemaan ympäristömuuttujissa asetettua porttia */
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
