import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'
import { useField } from './hooks'

// Notifikaatiokomponentti
const Notification = ({ message }) => {
  if (!message) return null
  return (
    <div style={{ border: '1px solid black', padding: 10, marginBottom: 10 }}>
      {message}
    </div>
  )
}

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <em>An anecdote is a brief, revealing account...</em>
    <p>Software engineering is full of excellent anecdotes...</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.<br />
    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>source code</a>.
  </div>
)

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    setNotification(`a new anecdote '${content.value}' created!`);
    navigate('/');
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            value={content.value}
            type={content.type}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            value={author.value}
            type={author.type}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            value={info.value}
            type={info.type}
            onChange={info.onChange}
          />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};



const Anecdote = ({ anecdotes }) => {
  const id = Number(useParams().id)
  const anecdote = anecdotes.find(a => a.id === id)

  if (!anecdote) return <div>anecdote not found</div>

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification message={notification} />
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
          <Route path='/about' element={<About />} />
          <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
