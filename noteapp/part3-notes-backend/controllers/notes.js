const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

notesRouter.post('/', async (req, res) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    comments: [],
  })

  const savedNote = await note.save()
  res.status(201).json(savedNote)
})

notesRouter.put('/:id', async (req, res) => {
  const { content, important } = req.body

  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )

  if (updatedNote) {
    res.json(updatedNote)
  } else {
    res.status(404).end()
  }
})

notesRouter.get('/:id/comments', async (request, response) => {
  const note = await Note.findById(request.params.id)

  if (note) {
    response.json(note.comments)
  } else {
    response.status(404).end()
  }
})

notesRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  const note = await Note.findById(request.params.id)

  if (!note) {
    return response.status(404).send({ error: 'Note not found' })
  }

  note.comments = note.comments.concat(comment)
  await note.save()
  response.status(201).json(comment)
})

module.exports = notesRouter
