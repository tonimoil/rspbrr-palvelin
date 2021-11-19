require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const Note = require('./models/note')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../client/build')));

/*                     */
/*                     */
/*  Sovelluksen polut  */
/*                     */
/*                     */

/* Kaikkien haku */
app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

/* Id:llä haku */
app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
    .then(note => {
        if (note) {
            response.json(note)
        } else {
        response.status(404).end()
        }
    })
    .catch(error => {
        response.status(500).end()
    })
})

/* Post polku */
app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined || body.apikey != process.env.API_KEY) {
      return response.status(400).json({ error: 'error' })
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })
  
    note.save().then(savedNote => {
      response.json(savedNote)
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
