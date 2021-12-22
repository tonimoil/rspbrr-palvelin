require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const Temperature = require('./models/temperature')

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../client/build')));

/* Virheiden käsittely palvelimelle saapuville epäonnistuneille pyynnöille */
const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id'})
    } else if (error.name ==='ValidationError') {
        return res.status(400).json({ error: error.message})
    }
    next(error)
}

/*                     */
/*                     */
/*  Sovelluksen polut  */
/*                     */
/*                     */

/* Kaikkien haku */
app.get('/api/temperatures', (req, res) => {
    Temperature.find({}).then(temps => {
        res.json(temps)
    })
})

/* Viimeisten kirjausten haku Id:n mukaan */
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
app.post('/api/posttemperature', (req, res, next) => {
    const body = req.body

    if ( body.apikey != process.env.API_KEY ) {
      return res.status(400).json({ error: body.apikey ? 'apikey virheellinen':'apikey puuttuu' })
    }

    const temp = new Temperature({
      temperature: body.temp,
      date: new Date(),
      deviceId: body.deviceId,
    })

    temp.save()
        .then(savedTemp => {
            res.json(savedTemp.toJSON())
        })
        .catch(error => next(error)) //Jos lähetetty data ei ole skeeman ehtojen mukainen, niin viedään errorHandler middlewarelle
})

/* Palautetaan defaulttina reactin luoma sivu */
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

/* Otetaan lopussa errorHandler käyttöön, jotta sitä voidaan käyttää */
app.use(errorHandler)

/* Lopuksi asetetaan sovellus kuuntelemaan ympäristömuuttujissa asetettua porttia */
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
