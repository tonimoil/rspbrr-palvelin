const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let notes = [
    {
        id:1,
        content:"note1",
        date: "2020-01-10T17:30:31.098Z",
        important: true
    },
    {
        id:2,
        content:"note2",
        date: "2020-01-10T18:39:34.091Z",
        important: false
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
  })

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if(note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
})

  app.post('/api/notes', (request, response) => {
    const note = request.body
    console.log(note)
    response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
