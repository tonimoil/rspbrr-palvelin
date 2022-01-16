require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const devicesRouter = require('./controllers/devices')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const tempRouter = require('./controllers/temperatures')

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/api/devices', devicesRouter)
app.use('/api/login', loginRouter)
app.use('/api/temp', tempRouter)

/* Palautetaan defaulttina reactin luoma sivu */
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

/* Otetaan lopussa errorHandler käyttöön, jotta sitä voidaan käyttää */
app.use(middleware.errorHandler)

/* Lopuksi asetetaan sovellus kuuntelemaan ympäristömuuttujissa asetettua porttia */
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
