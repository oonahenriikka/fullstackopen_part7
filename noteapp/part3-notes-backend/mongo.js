const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  'mongodb+srv://oonanykanen:salasana@cluster0.je8xz.mongodb.net/part7?retryWrites=true&w=majority&appName=Cluster0'

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })

  const Note = mongoose.model('Note', noteSchema)

  /*
  const note = new Note({
    content: 'HTML is x',
    important: true,
  })

  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  */
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
})
