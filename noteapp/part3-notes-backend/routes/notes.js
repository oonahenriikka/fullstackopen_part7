router.post('/:id/comments', async (req, res) => {
  const { id } = req.params
  const { comment } = req.body

  try {
    const note = await Note.findById(id)
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' })
    }

    note.comments.push(comment)  // Add the new comment to the comments array
    await note.save()  // Save the updated note

    res.status(200).json(note)  // Return the updated note
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})
